import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-900 text-white shadow-soft hover:bg-primary-800 active:scale-[0.98]',
        accent:
          'bg-accent-500 text-primary-950 font-semibold shadow-soft hover:bg-accent-400 active:scale-[0.98]',
        outline:
          'border border-primary-900/20 bg-transparent text-primary-900 hover:bg-primary-50 hover:border-primary-900/40 active:scale-[0.98]',
        secondary:
          'bg-primary-50 text-primary-900 hover:bg-primary-100 active:scale-[0.98]',
        ghost:
          'text-foreground hover:bg-muted active:scale-[0.98]',
        danger:
          'bg-danger text-white hover:bg-red-700 active:scale-[0.98]',
        link:
          'text-primary-900 underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        sm: 'h-9 px-3.5 text-xs rounded-lg',
        md: 'h-11 px-5 text-sm rounded-xl',
        lg: 'h-13 px-7 text-base rounded-2xl font-semibold',
        icon: 'h-11 w-11 rounded-xl p-0',
        iconSm: 'h-9 w-9 rounded-lg p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
