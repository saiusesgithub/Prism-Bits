import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 hover:scale-[1.02]",
  {
    variants: {
      variant: {
        primary:
          "btn-shine bg-white !text-zinc-950 shadow-[0_14px_40px_rgb(0_0_0/0.3)] hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgb(0_0_0/0.4),0_0_28px_hsl(var(--accent)/0.4),0_0_56px_hsl(var(--accent-2)/0.22)] dark:bg-white dark:!text-zinc-950",
        secondary:
          "prismatic-border !text-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_14px_40px_rgb(0_0_0/0.3)] backdrop-blur-md hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.16),0_18px_50px_rgb(0_0_0/0.38),0_0_32px_hsl(var(--accent)/0.22)] hover:[--prism-surface:hsl(var(--card)/0.85)] dark:!text-white",
        ghost: "text-muted hover:bg-white/[0.08] hover:text-foreground dark:text-white/70 dark:hover:text-white",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-14 px-9 text-lg",
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

type ButtonBaseProps = {
  isLoading?: boolean;
  children?: ReactNode;
};

type ButtonAsButtonProps = ComponentPropsWithoutRef<"button"> &
  ButtonVariantProps &
  ButtonBaseProps & {
    asChild?: boolean;
    href?: never;
  };

type ButtonAsLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "className"> &
  ButtonVariantProps &
  ButtonBaseProps & {
    className?: string;
    asChild?: never;
  };

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export function Button({ className, variant, size, asChild, isLoading, children, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size, className }));

  const content = (
    <>
      {isLoading && <Loader2 className="size-4 animate-spin" />}
      {children}
    </>
  );

  if ((props as ButtonAsLinkProps).href !== undefined) {
    const linkProps = props as ButtonAsLinkProps;
    return (
      <Link className={classes} {...linkProps}>
        {content}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButtonProps;
  const Comp = asChild ? Slot : "button";

  return (
    <Comp className={classes} disabled={isLoading || buttonProps.disabled} {...buttonProps}>
      {content}
    </Comp>
  );
}

export { buttonVariants };
