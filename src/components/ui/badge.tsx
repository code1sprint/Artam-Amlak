import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors select-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary-900 text-white shadow-xs',
        accent: 'bg-accent-500/15 text-accent-800 border border-accent-500/30 font-semibold',
        secondary: 'bg-primary-50 text-primary-900 border border-primary-100',
        success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
        danger: 'bg-rose-50 text-rose-700 border border-rose-200',
        outline: 'border border-border text-foreground bg-white',
        goldFilled: 'bg-accent-500 text-primary-950 font-semibold shadow-xs',
      },
      size: {
        sm: 'px-2 py-0.5 text-[11px]',
        md: 'px-3 py-1 text-xs',
        lg: 'px-3.5 py-1.5 text-sm font-semibold',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}
