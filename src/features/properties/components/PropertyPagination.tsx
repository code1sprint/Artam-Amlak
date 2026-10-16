import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toPersianDigits } from '@/lib/formatters';

export interface PropertyPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function PropertyPagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PropertyPaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | string)[] = [];

  if (totalPages <= 6) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    if (currentPage > 3) {
      pages.push('...');
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }
    pages.push(totalPages);
  }

  return (
    <nav
      className={`flex items-center justify-center gap-1.5 pt-10 select-none ${className}`}
      aria-label="صفحه‌بندی نتایج املاک"
    >
      {/* Previous Page Button (In RTL, Prev is to the Right -> ChevronRight) */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="rounded-xl border-border bg-white text-primary-900 disabled:opacity-40 shadow-2xs gap-1"
        aria-label="صفحه قبلی"
      >
        <ChevronRight className="w-4 h-4" />
        <span className="hidden sm:inline">قبلی</span>
      </Button>

      {/* Number Buttons */}
      <div className="flex items-center gap-1">
        {pages.map((p, idx) => {
          if (p === '...') {
            return (
              <span
                key={`dots-${idx}`}
                className="w-9 h-9 flex items-center justify-center text-xs text-muted-foreground font-bold"
              >
                ...
              </span>
            );
          }

          const pageNum = Number(p);
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={`w-10 h-10 rounded-xl text-xs sm:text-sm font-bold font-sans transition-all cursor-pointer flex items-center justify-center ${
                isActive
                  ? 'bg-primary-900 text-white shadow-soft scale-105'
                  : 'bg-white text-foreground hover:bg-neutral-background hover:text-primary-900 border border-border shadow-2xs'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {toPersianDigits(pageNum)}
            </button>
          );
        })}
      </div>

      {/* Next Page Button (In RTL, Next is to the Left -> ChevronLeft) */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="rounded-xl border-border bg-white text-primary-900 disabled:opacity-40 shadow-2xs gap-1"
        aria-label="صفحه بعدی"
      >
        <span className="hidden sm:inline">بعدی</span>
        <ChevronLeft className="w-4 h-4" />
      </Button>
    </nav>
  );
}
