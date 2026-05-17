import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-[14px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-white !text-zinc-950 shadow-[0_18px_45px_rgb(0_0_0/0.18)] hover:bg-white/90",
        secondary: "border border-white/12 bg-white/[0.12] !text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.12)] backdrop-blur-md hover:bg-white/[0.16]",
        ghost: "text-white/58 hover:text-white",
      },
      size: {
        md: "h-11 px-6 text-base",
        lg: "h-14 px-8 text-lg",
        icon: "size-11",
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
