import React from 'react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/formatters';
import { UI_STRINGS } from '@/constants/translations';

export interface PriceTextProps extends React.HTMLAttributes<HTMLDivElement> {
  amount: number | null | undefined;
  prefix?: string;
  suffix?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  readableUnit?: boolean;
}

export function PriceText({
  amount,
  prefix,
  suffix,
  size = 'md',
  readableUnit = false,
  className,
  ...props
}: PriceTextProps) {
  const sizeStyles = {
    sm: 'text-sm font-semibold',
    md: 'text-base font-bold',
    lg: 'text-xl sm:text-2xl font-extrabold',
    xl: 'text-2xl sm:text-3xl font-black',
  };

  const formattedValue = formatPrice(amount, {
    showCurrency: false,
    readableUnit,
  });

  return (
    <div
      className={cn(
        'inline-flex items-baseline gap-1.5 text-primary-900',
        className
      )}
      {...props}
    >
      {prefix && (
        <span className="text-xs text-muted-foreground font-normal">{prefix}</span>
      )}
      <span className={cn('tracking-tight font-sans', sizeStyles[size])}>
        {formattedValue}
      </span>
      {amount && amount > 0 ? (
        <span className="text-xs text-accent-700 font-medium">
          {UI_STRINGS.units.toman}
        </span>
      ) : null}
      {suffix && (
        <span className="text-xs text-muted-foreground font-normal">/ {suffix}</span>
      )}
    </div>
  );
}
