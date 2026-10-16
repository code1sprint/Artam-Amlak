import React from 'react';
import { LayoutGrid, List, Map } from 'lucide-react';
import { cn } from '@/lib/utils';

export type PropertyViewMode = 'grid' | 'list' | 'map';

export interface PropertyViewSwitcherProps {
  viewMode: PropertyViewMode;
  onViewChange: (mode: PropertyViewMode) => void;
  className?: string;
}

export function PropertyViewSwitcher({
  viewMode,
  onViewChange,
  className = '',
}: PropertyViewSwitcherProps) {
  const views: { id: PropertyViewMode; label: string; icon: React.ReactNode }[] = [
    { id: 'grid', label: 'شبکه‌ای', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'list', label: 'لیست', icon: <List className="w-4 h-4" /> },
    { id: 'map', label: 'روی نقشه', icon: <Map className="w-4 h-4" /> },
  ];

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 p-1 bg-white border border-border rounded-xl shadow-xs',
        className
      )}
      role="group"
      aria-label="انتخاب نحوه نمایش املاک"
    >
      {views.map((item) => {
        const isActive = viewMode === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onViewChange(item.id)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all select-none cursor-pointer',
              isActive
                ? 'bg-primary-900 text-white shadow-soft'
                : 'text-muted-foreground hover:text-primary-900 hover:bg-neutral-background'
            )}
            title={item.label}
          >
            {item.icon}
            <span className="hidden sm:inline">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
