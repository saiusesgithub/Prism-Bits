import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-foreground text-background shadow-lg shadow-purple-950/20 hover:bg-white/90",
        secondary: "border border-white/10 bg-white/[0.06] text-foreground hover:bg-white/[0.1]",
        ghost: "text-muted hover:text-foreground",
      },
      size: {
        md: "h-10 px-5",
        lg: "h-12 px-6",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type ButtonAsButtonProps = ComponentPropsWithoutRef<"button"> &
  ButtonVariantProps & {
    asChild?: boolean;
    href?: never;
  };

type ButtonAsLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "className"> &
  ButtonVariantProps & {
    className?: string;
    asChild?: never;
  };

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size, className }));

  if ((props as ButtonAsLinkProps).href !== undefined) {
    const linkProps = props as ButtonAsLinkProps;
    return <Link className={classes} {...linkProps} />;
  }

  const buttonProps = props as ButtonAsButtonProps;
  const Comp = asChild ? Slot : "button";

  return <Comp className={classes} {...buttonProps} />;
}

export { buttonVariants };
