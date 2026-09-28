// Nach dem Build: SPA-Hülle als 404.html für GitHub Pages bereitstellen.
import { copyFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const out = ["dist/client", "dist"].find((d) => existsSync(join(d, "_shell.html")));
if (!out) {
  console.error("Keine _shell.html gefunden:", existsSync("dist") ? readdirSync("dist") : "kein dist");
  process.exit(1);
}
copyFileSync(join(out, "_shell.html"), join(out, "404.html"));
console.log(`404.html aus der SPA-Hülle erzeugt (${out}).`);
