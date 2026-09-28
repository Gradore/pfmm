-- PFMM: vollständiges Schema (konsolidiert aus den bisherigen Migrationen)

CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role) $$;

CREATE POLICY "Eigene Rolle lesen" ON public.user_roles
  FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins verwalten Rollen" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public
AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Termine ---------------------------------------------------------------
CREATE TABLE public.seminar_termine (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seminar_slug text NOT NULL,
  titel_zusatz text,
  start_datum date NOT NULL,
  end_datum date NOT NULL,
  format text NOT NULL DEFAULT 'praesenz' CHECK (format IN ('praesenz','online','inhouse')),
  ort text,
  plaetze_gesamt int NOT NULL DEFAULT 4 CHECK (plaetze_gesamt > 0),
  plaetze_belegt int NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'offen' CHECK (status IN ('geplant','offen','ausgebucht','abgesagt','durchgefuehrt')),
  honorar_hinweis text,
  oeffentlich boolean NOT NULL DEFAULT false,
  notiz text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.seminar_termine ENABLE ROW LEVEL SECURITY;
CREATE INDEX seminar_termine_slug_idx ON public.seminar_termine(seminar_slug);

CREATE POLICY "Oeffentliche Termine sind lesbar" ON public.seminar_termine
  FOR SELECT TO anon, authenticated
  USING (oeffentlich = true AND status <> 'geplant');
CREATE POLICY "Admins verwalten Termine" ON public.seminar_termine
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER seminar_termine_updated_at BEFORE UPDATE ON public.seminar_termine
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Buchungen -------------------------------------------------------------
CREATE TABLE public.buchungen (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  termin_id uuid REFERENCES public.seminar_termine(id) ON DELETE RESTRICT,
  seminar_slug text NOT NULL,
  art text NOT NULL DEFAULT 'anmeldung' CHECK (art IN ('anmeldung','terminanfrage')),
  wunsch_zeitraum text,
  wunsch_format text CHECK (wunsch_format IS NULL OR wunsch_format IN ('praesenz','online','inhouse')),
  anzahl_personen integer CHECK (anzahl_personen IS NULL OR (anzahl_personen BETWEEN 1 AND 200)),
  vorname text NOT NULL,
  nachname text NOT NULL,
  unternehmen text,
  funktion text,
  anschrift text,
  telefon text,
  email text NOT NULL,
  anzahl_plaetze int NOT NULL DEFAULT 1 CHECK (anzahl_plaetze BETWEEN 1 AND 10),
  nachricht text,
  status text NOT NULL DEFAULT 'angefragt'
    CHECK (status IN ('angefragt','bestaetigt','warteliste','storniert','erledigt','abgelehnt')),
  storno_am timestamptz,
  storno_stufe integer CHECK (storno_stufe IS NULL OR (storno_stufe BETWEEN 0 AND 100)),
  storno_tage_vorher integer,
  storno_grund text,
  notiz_intern text,
  datenschutz_ok boolean NOT NULL,
  storno_ok boolean NOT NULL,
  quelle text DEFAULT 'website',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT buchungen_art_konsistenz CHECK (
    (art = 'anmeldung' AND termin_id IS NOT NULL AND storno_ok = true)
    OR (art = 'terminanfrage' AND termin_id IS NULL)
  )
);
ALTER TABLE public.buchungen ENABLE ROW LEVEL SECURITY;
CREATE INDEX buchungen_termin_idx ON public.buchungen(termin_id);
CREATE INDEX buchungen_seminar_slug_created_idx ON public.buchungen (seminar_slug, created_at DESC);
CREATE INDEX buchungen_status_created_idx ON public.buchungen (status, created_at DESC);

-- Öffentliche Buchungen laufen ausschließlich über die Edge Function (service role).
CREATE POLICY "Admins verwalten Buchungen" ON public.buchungen
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER buchungen_updated_at BEFORE UPDATE ON public.buchungen
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.buchung_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  buchung_id uuid NOT NULL REFERENCES public.buchungen(id) ON DELETE CASCADE,
  von_status text,
  nach_status text,
  notiz text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.buchung_events ENABLE ROW LEVEL SECURITY;
CREATE INDEX buchung_events_buchung_idx ON public.buchung_events(buchung_id);
CREATE POLICY "Admins sehen das Protokoll" ON public.buchung_events
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Trigger: Warteliste, Belegung, Protokoll --------------------------------
CREATE OR REPLACE FUNCTION public.buchung_warteliste_pruefen()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE v_gesamt int; v_belegt int;
BEGIN
  IF NEW.termin_id IS NULL THEN RETURN NEW; END IF;
  SELECT plaetze_gesamt INTO v_gesamt FROM public.seminar_termine WHERE id = NEW.termin_id;
  SELECT COALESCE(SUM(anzahl_plaetze), 0) INTO v_belegt
    FROM public.buchungen WHERE termin_id = NEW.termin_id AND status IN ('angefragt','bestaetigt');
  IF NEW.status IN ('angefragt','bestaetigt') AND v_belegt + NEW.anzahl_plaetze > v_gesamt THEN
    NEW.status := 'warteliste';
  END IF;
  RETURN NEW;
END; $$;

CREATE TRIGGER buchungen_warteliste BEFORE INSERT ON public.buchungen
  FOR EACH ROW EXECUTE FUNCTION public.buchung_warteliste_pruefen();

CREATE OR REPLACE FUNCTION public.termin_status_aktualisieren()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_termin uuid := COALESCE(NEW.termin_id, OLD.termin_id);
  v_gesamt int; v_belegt int; v_status text;
BEGIN
  IF v_termin IS NULL THEN RETURN NULL; END IF;
  SELECT plaetze_gesamt, status INTO v_gesamt, v_status FROM public.seminar_termine WHERE id = v_termin;
  IF v_gesamt IS NULL THEN RETURN NULL; END IF;
  SELECT COALESCE(SUM(anzahl_plaetze), 0) INTO v_belegt
    FROM public.buchungen WHERE termin_id = v_termin AND status IN ('angefragt','bestaetigt');
  UPDATE public.seminar_termine SET plaetze_belegt = v_belegt WHERE id = v_termin;
  IF v_status IN ('offen','ausgebucht') THEN
    IF v_belegt >= v_gesamt AND v_status <> 'ausgebucht' THEN
      UPDATE public.seminar_termine SET status = 'ausgebucht' WHERE id = v_termin;
    ELSIF v_belegt < v_gesamt AND v_status <> 'offen' THEN
      UPDATE public.seminar_termine SET status = 'offen' WHERE id = v_termin;
    END IF;
  END IF;
  RETURN NULL;
END; $$;

CREATE TRIGGER buchungen_termin_status AFTER INSERT OR UPDATE OR DELETE ON public.buchungen
  FOR EACH ROW EXECUTE FUNCTION public.termin_status_aktualisieren();

CREATE OR REPLACE FUNCTION public.buchung_status_protokoll()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.buchung_events (buchung_id, von_status, nach_status, notiz)
    VALUES (NEW.id, NULL, NEW.status, 'Buchung eingegangen');
  ELSIF NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO public.buchung_events (buchung_id, von_status, nach_status, notiz)
    VALUES (NEW.id, OLD.status, NEW.status, 'Statusänderung');
  END IF;
  RETURN NULL;
END; $$;

CREATE TRIGGER buchungen_protokoll AFTER INSERT OR UPDATE ON public.buchungen
  FOR EACH ROW EXECUTE FUNCTION public.buchung_status_protokoll();

-- Praxisbrief -----------------------------------------------------------
CREATE TABLE public.praxisbrief_abos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'ausstehend' CHECK (status IN ('ausstehend','aktiv','abgemeldet')),
  bestaetigungs_token_hash text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX praxisbrief_abos_token_idx ON public.praxisbrief_abos (bestaetigungs_token_hash)
  WHERE bestaetigungs_token_hash IS NOT NULL;
ALTER TABLE public.praxisbrief_abos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins sehen Abos" ON public.praxisbrief_abos
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Rechte ----------------------------------------------------------------
REVOKE ALL ON public.seminar_termine, public.buchungen, public.buchung_events,
  public.user_roles, public.praxisbrief_abos FROM anon;
GRANT SELECT (id, seminar_slug, titel_zusatz, start_datum, end_datum, format, ort,
  plaetze_gesamt, plaetze_belegt, status, honorar_hinweis, oeffentlich, created_at, updated_at)
  ON public.seminar_termine TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.seminar_termine, public.buchungen,
  public.buchung_events TO authenticated;
GRANT SELECT ON public.user_roles, public.praxisbrief_abos TO authenticated;

REVOKE EXECUTE ON FUNCTION public.buchung_warteliste_pruefen() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.termin_status_aktualisieren() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.buchung_status_protokoll() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
