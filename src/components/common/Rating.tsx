import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toPersianDigits } from '@/lib/formatters';

export interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  showText?: boolean;
  reviewsCount?: number;
  size?: 'sm' | 'md' | 'lg';
}

export function Rating({
  value,
  max = 5,
  showText = true,
  reviewsCount,
  size = 'md',
  className,
  ...props
}: RatingProps) {
  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div
      className={cn('inline-flex items-center gap-1.5 select-none', className)}
      {...props}
    >
      <div className="flex items-center gap-0.5" dir="ltr">
        {Array.from({ length: max }).map((_, index) => {
          const filled = index + 1 <= Math.round(value);
          return (
            <Star
              key={index}
              className={cn(
                iconSizes[size],
                filled
                  ? 'fill-accent-500 text-accent-500'
                  : 'fill-muted/60 text-border'
              )}
            />
          );
        })}
      </div>

      {showText && (
        <span className="text-xs font-semibold text-primary-900 ms-1">
          {toPersianDigits(value.toFixed(1))}
        </span>
      )}

      {reviewsCount !== undefined && (
        <span className="text-xs text-muted-foreground">
          ({toPersianDigits(reviewsCount)} نظر)
        </span>
      )}
    </div>
  );
}
