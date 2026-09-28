import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold cursor-pointer transition-all duration-200 focus-visible:outline-3 focus-visible:outline-brass-600 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-[1.15em] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-soft hover:bg-primary/90",
        /* Every call-to-action on this site is brass. */
        brass:
          "bg-brass-600 text-paper shadow-soft hover:bg-brass-700 hover:-translate-y-0.5 hover:shadow-lift",
        ghostBrand:
          "border border-ink-200 bg-transparent text-ink-900 hover:border-brass-600 hover:text-brass-700",
        onDark:
          "border border-brass-400/60 bg-transparent text-brass-400 hover:bg-brass-400 hover:text-ink-900",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-muted hover:text-secondary-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-muted hover:text-secondary-foreground",
        link: "text-brass-700 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2 text-[16px]",
        sm: "h-9 rounded-md px-3 text-sm",
        lg: "h-12 rounded-lg px-6 text-[17px]",
        xl: "h-14 rounded-lg px-8 text-[17px]",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
