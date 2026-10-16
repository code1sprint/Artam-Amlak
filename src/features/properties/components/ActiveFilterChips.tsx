import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { X, RotateCcw } from 'lucide-react';
import { toPersianDigits } from '@/lib/formatters';

export function ActiveFilterChips({ className = '' }: { className?: string }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const chips: { key: string; label: string; paramName: string }[] = [];

  // Deal Type
  const dealType = searchParams.get('dealType');
  if (dealType && dealType !== 'all') {
    const labels: Record<string, string> = {
      sale: 'خرید و فروش',
      rent: 'رهن و اجاره',
      mortgage: 'رهن کامل',
    };
    chips.push({ key: 'dealType', label: `معامله: ${labels[dealType] || dealType}`, paramName: 'dealType' });
  }

  // Property Type
  const propertyType = searchParams.get('propertyType');
  if (propertyType && propertyType !== 'all') {
    const labels: Record<string, string> = {
      apartment: 'آپارتمان و پنت‌هاوس',
      villa: 'ویلای مستقل',
      commercial: 'اداری و تجاری',
      land: 'زمین و کلنگی',
    };
    chips.push({ key: 'propertyType', label: `نوع ملک: ${labels[propertyType] || propertyType}`, paramName: 'propertyType' });
  }

  // District
  const district = searchParams.get('district');
  if (district && district !== 'همه محله‌ها') {
    chips.push({ key: 'district', label: `محله: ${district}`, paramName: 'district' });
  }

  // Min Price
  const minPrice = searchParams.get('minPrice');
  if (minPrice && Number(minPrice) > 0) {
    const bill = Math.round(Number(minPrice) / 1_000_000_000);
    chips.push({ key: 'minPrice', label: `حداقل: ${toPersianDigits(bill)} میلیارد`, paramName: 'minPrice' });
  }

  // Max Price
  const maxPrice = searchParams.get('maxPrice');
  if (maxPrice && Number(maxPrice) > 0) {
    const bill = Math.round(Number(maxPrice) / 1_000_000_000);
    chips.push({ key: 'maxPrice', label: `حداکثر: ${toPersianDigits(bill)} میلیارد`, paramName: 'maxPrice' });
  }

  // Min Area
  const minArea = searchParams.get('minArea');
  if (minArea && Number(minArea) > 0) {
    chips.push({ key: 'minArea', label: `متراژ بالای: ${toPersianDigits(minArea)} م²`, paramName: 'minArea' });
  }

  // Bedrooms
  const bedrooms = searchParams.get('bedrooms');
  if (bedrooms && Number(bedrooms) > 0) {
    chips.push({ key: 'bedrooms', label: `حداقل: ${toPersianDigits(bedrooms)} خواب`, paramName: 'bedrooms' });
  }

  // Search Query
  const search = searchParams.get('search');
  if (search && search.trim() !== '') {
    chips.push({ key: 'search', label: `جستجو: «${search}»`, paramName: 'search' });
  }

  // isFeatured
  const isFeatured = searchParams.get('isFeatured');
  if (isFeatured === 'true') {
    chips.push({ key: 'isFeatured', label: 'املاک ویژه و شاخص', paramName: 'isFeatured' });
  }

  if (chips.length === 0) return null;

  const removeChip = (paramName: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(paramName);
    newParams.delete('page');
    setSearchParams(newParams);
  };

  const clearAll = () => {
    const newParams = new URLSearchParams();
    setSearchParams(newParams);
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 pt-1 pb-3 ${className}`}>
      <span className="text-xs text-muted-foreground font-semibold">فیلترهای فعال:</span>

      {chips.map((chip) => (
        <span
          key={chip.key}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-50 text-primary-900 border border-accent-300 shadow-2xs transition-all hover:bg-accent-100"
        >
          <span>{chip.label}</span>
          <button
            type="button"
            onClick={() => removeChip(chip.paramName)}
            className="rounded-full p-0.5 hover:bg-black/10 text-accent-800 transition-colors cursor-pointer"
            aria-label={`حذف فیلتر ${chip.label}`}
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}

      <button
        type="button"
        onClick={clearAll}
        className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline ms-2 cursor-pointer"
      >
        <RotateCcw className="w-3 h-3" />
        <span>پاک کردن همه</span>
      </button>
    </div>
  );
}
