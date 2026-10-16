import React from 'react';
import { LucideIcon } from 'lucide-react';
import { IconBox } from './IconBox';
import { cn } from '@/lib/utils';

export interface StatItemProps {
  icon?: LucideIcon;
  value: string;
  label: string;
  description?: string;
  variant?: 'card' | 'minimal';
  className?: string;
}

export function StatItem({
  icon: Icon,
  value,
  label,
  description,
  variant = 'card',
  className = '',
}: StatItemProps) {
  if (variant === 'minimal') {
    return (
      <div className={cn('flex flex-col items-center text-center space-y-1', className)}>
        <span className="text-3xl sm:text-4xl font-black text-primary-900 font-sans tracking-tight">
          {value}
        </span>
        <span className="text-xs sm:text-sm font-semibold text-muted-foreground">{label}</span>
        {description && (
          <span className="text-[11px] text-muted-foreground/80">{description}</span>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex items-center gap-4 p-5 rounded-2xl bg-white border border-border shadow-soft transition-all duration-200 hover:shadow-card hover:-translate-y-0.5',
        className
      )}
    >
      {Icon && (
        <IconBox
          icon={<Icon className="w-5 h-5 text-accent-700" />}
          variant="softAccent"
          size="md"
        />
      )}
      <div className="flex flex-col">
        <span className="text-2xl sm:text-3xl font-black text-primary-900 font-sans tracking-tight">
          {value}
        </span>
        <span className="text-xs font-semibold text-slate-700 mt-0.5">{label}</span>
        {description && (
          <span className="text-[11px] text-muted-foreground mt-0.5">{description}</span>
        )}
      </div>
    </div>
  );
}
