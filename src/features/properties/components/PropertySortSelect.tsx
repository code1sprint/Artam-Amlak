import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PropertySortOption } from '@/types/schema';

export interface PropertySortSelectProps {
  value: PropertySortOption;
  onChange: (sort: PropertySortOption) => void;
  className?: string;
}

export function PropertySortSelect({
  value,
  onChange,
  className = '',
}: PropertySortSelectProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-xs font-semibold text-muted-foreground hidden sm:flex items-center gap-1 shrink-0">
        <ArrowUpDown className="w-3.5 h-3.5 text-accent" />
        مرتب‌سازی:
      </span>
      <Select value={value} onValueChange={(val) => onChange(val as PropertySortOption)}>
        <SelectTrigger className="h-10 w-44 rounded-xl bg-white border-border text-xs font-semibold shadow-xs">
          <SelectValue placeholder="مرتب‌سازی بر اساس" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">جدیدترین فایل‌ها</SelectItem>
          <SelectItem value="priceAsc">ارزان‌ترین به گران‌ترین</SelectItem>
          <SelectItem value="priceDesc">گران‌ترین به ارزان‌ترین</SelectItem>
          <SelectItem value="areaDesc">بیشترین متراژ</SelectItem>
          <SelectItem value="areaAsc">کمترین متراژ</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
