import React from 'react';
import { Property } from '@/types/schema';
import { PropertyCard } from './PropertyCard';
import { PropertyCardSkeleton } from './PropertyCardSkeleton';
import { SearchX, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface PropertyGridProps {
  properties?: Property[];
  isLoading?: boolean;
  skeletonCount?: number;
  emptyTitle?: string;
  emptyDescription?: string;
  onResetFilters?: () => void;
  className?: string;
}

export function PropertyGrid({
  properties = [],
  isLoading = false,
  skeletonCount = 6,
  emptyTitle = 'ملکی با فیلترهای انتخابی یافت نشد',
  emptyDescription = 'لطفاً بازه قیمت، متراژ یا محله‌های انتخابی را تغییر دهید تا نتایج بیشتری مشاهده فرمایید.',
  onResetFilters,
  className = '',
}: PropertyGridProps) {
  // 1. Loading State
  if (isLoading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <PropertyCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // 2. Empty State
  if (!properties || properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-white border border-border shadow-soft min-h-[380px]">
        <div className="w-16 h-16 rounded-2xl bg-accent-50 text-accent-700 border border-accent-200/80 flex items-center justify-center mb-4 shadow-xs">
          <SearchX className="w-8 h-8" />
        </div>

        <h3 className="text-xl font-bold text-primary-900 mb-2">
          {emptyTitle}
        </h3>

        <p className="text-sm text-muted-foreground max-w-md leading-relaxed mb-6">
          {emptyDescription}
        </p>

        {onResetFilters && (
          <Button variant="primary" onClick={onResetFilters}>
            <RotateCcw className="w-4 h-4 ms-2" />
            پاک کردن فیلترها و مشاهده همه فایل‌ها
          </Button>
        )}
      </div>
    );
  }

  // 3. Grid Display
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
