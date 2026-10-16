import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, RotateCcw, Search, Check, Sparkles, Building, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { toPersianDigits } from '@/lib/formatters';

const TEHRAN_DISTRICTS = [
  'همه محله‌ها',
  'زعفرانیه',
  'فرشته',
  'الهیه',
  'نیاوران',
  'کامرانیه',
  'فرمانیه',
  'ولنجک',
  'اقدسیه',
  'محمودیه',
  'تجریش',
  'سعادت‌آباد',
  'شهرک غرب',
  'لواسان',
];

export interface PropertyFiltersProps {
  className?: string;
  onFilterChange?: () => void;
}

export function PropertyFilters({ className, onFilterChange }: PropertyFiltersProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Local state initialized from searchParams
  const [dealType, setDealType] = useState<string>(searchParams.get('dealType') || 'all');
  const [propertyType, setPropertyType] = useState<string>(searchParams.get('propertyType') || 'all');
  const [district, setDistrict] = useState<string>(searchParams.get('district') || 'همه محله‌ها');
  const [minArea, setMinArea] = useState<string>(searchParams.get('minArea') || '');
  const [bedrooms, setBedrooms] = useState<string>(searchParams.get('bedrooms') || '');
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('search') || '');

  // Price Slider in billions of Tomans (5 to 350)
  const initialMinPrice = searchParams.get('minPrice')
    ? Math.round(Number(searchParams.get('minPrice')) / 1_000_000_000)
    : 5;
  const initialMaxPrice = searchParams.get('maxPrice')
    ? Math.round(Number(searchParams.get('maxPrice')) / 1_000_000_000)
    : 350;

  const [priceRange, setPriceRange] = useState<number[]>([initialMinPrice, initialMaxPrice]);

  // Sync state if searchParams change externally (e.g. back button)
  useEffect(() => {
    setDealType(searchParams.get('dealType') || 'all');
    setPropertyType(searchParams.get('propertyType') || 'all');
    setDistrict(searchParams.get('district') || 'همه محله‌ها');
    setMinArea(searchParams.get('minArea') || '');
    setBedrooms(searchParams.get('bedrooms') || '');
    setSearchQuery(searchParams.get('search') || '');

    const pMin = searchParams.get('minPrice') ? Math.round(Number(searchParams.get('minPrice')) / 1_000_000_000) : 5;
    const pMax = searchParams.get('maxPrice') ? Math.round(Number(searchParams.get('maxPrice')) / 1_000_000_000) : 350;
    setPriceRange([pMin, pMax]);
  }, [searchParams]);

  // Apply filters into query string
  const handleApply = () => {
    const newParams = new URLSearchParams(searchParams);

    // Deal Type
    if (dealType && dealType !== 'all') {
      newParams.set('dealType', dealType);
    } else {
      newParams.delete('dealType');
    }

    // Property Type
    if (propertyType && propertyType !== 'all') {
      newParams.set('propertyType', propertyType);
    } else {
      newParams.delete('propertyType');
    }

    // District
    if (district && district !== 'همه محله‌ها') {
      newParams.set('district', district);
    } else {
      newParams.delete('district');
    }

    // Min Area
    if (minArea && Number(minArea) > 0) {
      newParams.set('minArea', minArea);
    } else {
      newParams.delete('minArea');
    }

    // Bedrooms
    if (bedrooms && Number(bedrooms) > 0) {
      newParams.set('bedrooms', bedrooms);
    } else {
      newParams.delete('bedrooms');
    }

    // Search query
    if (searchQuery && searchQuery.trim() !== '') {
      newParams.set('search', searchQuery.trim());
    } else {
      newParams.delete('search');
    }

    // Price range
    if (priceRange[0] > 5) {
      newParams.set('minPrice', String(priceRange[0] * 1_000_000_000));
    } else {
      newParams.delete('minPrice');
    }
    if (priceRange[1] < 350) {
      newParams.set('maxPrice', String(priceRange[1] * 1_000_000_000));
    } else {
      newParams.delete('maxPrice');
    }

    // Reset to page 1 on filter change
    newParams.delete('page');

    setSearchParams(newParams);
    setIsMobileOpen(false);
    onFilterChange?.();
  };

  // Reset all filters
  const handleReset = () => {
    setDealType('all');
    setPropertyType('all');
    setDistrict('همه محله‌ها');
    setMinArea('');
    setBedrooms('');
    setSearchQuery('');
    setPriceRange([5, 350]);

    const newParams = new URLSearchParams();
    setSearchParams(newParams);
    setIsMobileOpen(false);
    onFilterChange?.();
  };

  // Count active filters
  const activeFiltersCount = [
    dealType !== 'all',
    propertyType !== 'all',
    district !== 'همه محله‌ها',
    minArea !== '',
    bedrooms !== '',
    searchQuery.trim() !== '',
    priceRange[0] > 5 || priceRange[1] < 350,
  ].filter(Boolean).length;

  // The reusable Filter Form Fields
  const FilterControls = () => (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-primary-900">جستجوی آزاد</label>
        <Input
          placeholder="عنوان ملک، امکانات خاص یا نام برج..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          startIcon={<Search className="w-4 h-4" />}
        />
      </div>

      {/* Deal Type */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-primary-900">نوع معامله</label>
        <Select value={dealType} onValueChange={setDealType}>
          <SelectTrigger>
            <SelectValue placeholder="انتخاب نوع معامله" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه معاملات</SelectItem>
            <SelectItem value="sale">خرید و فروش</SelectItem>
            <SelectItem value="rent">رهن و اجاره</SelectItem>
            <SelectItem value="mortgage">رهن کامل</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Property Type */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-primary-900">نوع ملک</label>
        <Select value={propertyType} onValueChange={setPropertyType}>
          <SelectTrigger>
            <SelectValue placeholder="انتخاب نوع ملک" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه انواع ملک</SelectItem>
            <SelectItem value="apartment">آپارتمان و پنت‌هاوس</SelectItem>
            <SelectItem value="villa">ویلای مستقل</SelectItem>
            <SelectItem value="commercial">اداری و تجاری</SelectItem>
            <SelectItem value="land">زمین و کلنگی</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* District */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-primary-900">محله / منطقه</label>
        <Select value={district} onValueChange={setDistrict}>
          <SelectTrigger>
            <SelectValue placeholder="انتخاب محله" />
          </SelectTrigger>
          <SelectContent>
            {TEHRAN_DISTRICTS.map((dist) => (
              <SelectItem key={dist} value={dist}>
                {dist}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-primary-900">محدوده قیمت (میلیارد تومان)</label>
          <span className="text-xs font-bold text-accent-700 font-sans">
            از {toPersianDigits(priceRange[0])} تا {toPersianDigits(priceRange[1])}
          </span>
        </div>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={5}
          max={350}
          step={5}
        />
        <div className="flex justify-between text-[11px] text-muted-foreground font-sans">
          <span>حداکثر: {toPersianDigits(350)} م.ت</span>
          <span>حداقل: {toPersianDigits(5)} م.ت</span>
        </div>
      </div>

      {/* Minimum Area & Bedrooms */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <div className="space-y-2">
          <label className="text-xs font-bold text-primary-900">حداقل متراژ (م²)</label>
          <Input
            type="number"
            placeholder="مثلاً ۲۰۰"
            value={minArea}
            onChange={(e) => setMinArea(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-primary-900">حداقل خواب</label>
          <Select value={bedrooms} onValueChange={setBedrooms}>
            <SelectTrigger>
              <SelectValue placeholder="تعداد خواب" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">فرقی ندارد</SelectItem>
              <SelectItem value="2">۲ خواب به بالا</SelectItem>
              <SelectItem value="3">۳ خواب به بالا</SelectItem>
              <SelectItem value="4">۴ خواب به بالا</SelectItem>
              <SelectItem value="5">۵ خواب به بالا</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 space-y-2.5">
        <Button variant="primary" className="w-full shadow-soft" onClick={handleApply}>
          اعمال فیلترها
        </Button>

        {activeFiltersCount > 0 && (
          <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-danger" onClick={handleReset}>
            <RotateCcw className="w-3.5 h-3.5 ms-1.5" />
            پاک کردن همه فیلترها ({toPersianDigits(activeFiltersCount)})
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar Filter */}
      <aside
        className={`hidden lg:block w-72 shrink-0 bg-white rounded-2xl p-6 border border-border shadow-soft sticky top-24 self-start ${className || ''}`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-border/80 mb-6">
          <div className="flex items-center gap-2 font-bold text-primary-900 text-sm">
            <SlidersHorizontal className="w-4 h-4 text-accent" />
            <span>فیلتر پیشرفته املاک</span>
          </div>
          {activeFiltersCount > 0 && (
            <Badge variant="accent" size="sm">
              {toPersianDigits(activeFiltersCount)} فیلتر
            </Badge>
          )}
        </div>

        <FilterControls />
      </aside>

      {/* Mobile Filter Button and Sheet Drawer */}
      <div className="lg:hidden w-full mb-6">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full justify-between h-12 rounded-xl bg-white border-border shadow-xs">
              <span className="flex items-center gap-2 font-semibold text-primary-900 text-sm">
                <SlidersHorizontal className="w-4 h-4 text-accent" />
                <span>فیلترهای پیشرفته املاک</span>
              </span>
              {activeFiltersCount > 0 && (
                <Badge variant="accent" size="sm">
                  {toPersianDigits(activeFiltersCount)} فعال
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="start" className="w-[90vw] max-w-md overflow-y-auto p-6">
            <SheetHeader className="text-start border-b border-border pb-4 mb-4">
              <SheetTitle className="flex items-center gap-2 text-primary-900 text-base">
                <SlidersHorizontal className="w-4 h-4 text-accent" />
                <span>فیلترهای اختصاصی</span>
              </SheetTitle>
            </SheetHeader>
            <FilterControls />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
