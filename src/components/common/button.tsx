import Link from 'next/link';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'btn-shine bg-white !text-zinc-950 shadow-[0_14px_40px_rgb(0_0_0/0.3)] hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgb(0_0_0/0.4),0_0_28px_hsl(var(--accent)/0.4),0_0_56px_hsl(var(--accent-2)/0.22)]',
        secondary:
          'prismatic-border !text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_14px_40px_rgb(0_0_0/0.3)] backdrop-blur-md hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.16),0_18px_50px_rgb(0_0_0/0.38),0_0_32px_hsl(var(--accent)/0.22)] hover:[--prism-surface:hsl(var(--card)/0.85)]',
        ghost: 'text-white/58 hover:bg-white/[0.06] hover:text-white',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-14 px-9 text-lg',
        icon: 'size-11',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type ButtonAsButtonProps = ComponentPropsWithoutRef<'button'> &
  ButtonVariantProps & {
    asChild?: boolean;
    href?: never;
  };

type ButtonAsLinkProps = Omit<
  ComponentPropsWithoutRef<typeof Link>,
  'className'
> &
  ButtonVariantProps & {
    className?: string;
    asChild?: never;
  };

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size, className }));

  if ((props as ButtonAsLinkProps).href !== undefined) {
    const linkProps = props as ButtonAsLinkProps;
    return <Link className={classes} {...linkProps} />;
  }

  const buttonProps = props as ButtonAsButtonProps;
  const Comp = asChild ? Slot : 'button';

  return <Comp className={classes} {...buttonProps} />;
}

export { buttonVariants };
