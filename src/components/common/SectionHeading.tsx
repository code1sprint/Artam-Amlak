import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'start';
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'center',
  className,
  ...props
}: SectionHeadingProps) {
  const isCentered = align === 'center';

  return (
    <div
      className={cn(
        'flex flex-col mb-10 md:mb-14',
        isCentered ? 'items-center text-center' : 'items-start text-start',
        className
      )}
      {...props}
    >
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-accent-50 text-accent-700 border border-accent-200 mb-3 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
          {badge}
        </span>
      )}

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary-900 tracking-tight relative pb-3">
        {title}
        {isCentered && (
          <span className="absolute bottom-0 start-1/2 -translate-x-1/2 w-16 h-1 bg-accent-500 rounded-full" />
        )}
        {!isCentered && (
          <span className="absolute bottom-0 start-0 w-16 h-1 bg-accent-500 rounded-full" />
        )}
      </h2>

      {subtitle && (
        <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
