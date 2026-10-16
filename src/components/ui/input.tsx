import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {startIcon && (
          <div className="absolute start-3.5 flex items-center pointer-events-none text-muted-foreground">
            {startIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-11 w-full rounded-xl border border-border bg-white px-4 text-sm text-foreground transition-all duration-200 placeholder:text-muted-foreground outline-none',
            'focus:border-accent focus:ring-2 focus:ring-accent/20',
            'disabled:cursor-not-allowed disabled:opacity-50',
            startIcon && 'ps-10',
            endIcon && 'pe-10',
            className
          )}
          ref={ref}
          {...props}
        />
        {endIcon && (
          <div className="absolute end-3.5 flex items-center pointer-events-none text-muted-foreground">
            {endIcon}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
