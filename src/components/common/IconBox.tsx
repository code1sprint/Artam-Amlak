import React from 'react';
import { cn } from '@/lib/utils';

export interface IconBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  variant?: 'primary' | 'accent' | 'softPrimary' | 'softAccent' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function IconBox({
  icon,
  variant = 'softAccent',
  size = 'md',
  className,
  ...props
}: IconBoxProps) {
  const sizeStyles = {
    sm: 'w-8 h-8 rounded-lg [&>svg]:w-4 [&>svg]:h-4',
    md: 'w-11 h-11 rounded-xl [&>svg]:w-5 [&>svg]:h-5',
    lg: 'w-14 h-14 rounded-2xl [&>svg]:w-7 [&>svg]:h-7',
    xl: 'w-16 h-16 rounded-2xl [&>svg]:w-8 [&>svg]:h-8',
  };

  const variantStyles = {
    primary: 'bg-primary-900 text-white shadow-soft',
    accent: 'bg-accent-500 text-primary-950 font-bold shadow-soft',
    softPrimary: 'bg-primary-50 text-primary-900 border border-primary-100',
    softAccent: 'bg-accent-50 text-accent-700 border border-accent-200/80',
    outline: 'border border-border bg-white text-primary-900',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center shrink-0 transition-transform duration-200',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {icon}
    </div>
  );
}
