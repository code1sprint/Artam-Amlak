import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Building2, MapPin, Tag, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ROUTES } from '@/constants/routes';

const QUICK_DISTRICTS = [
  'همه محله‌ها',
  'زعفرانیه',
  'فرشته',
  'الهیه',
  'نیاوران',
  'کامرانیه',
  'فرمانیه',
  'ولنجک',
  'اقدسیه',
  'سعادت‌آباد',
  'لواسان',
];

export function QuickSearchBar({ className = '' }: { className?: string }) {
  const navigate = useNavigate();
  const [dealType, setDealType] = useState<'sale' | 'rent' | 'mortgage'>('sale');
  const [propertyType, setPropertyType] = useState('all');
  const [district, setDistrict] = useState('همه محله‌ها');
  const [keyword, setKeyword] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (dealType) params.set('dealType', dealType);
    if (propertyType && propertyType !== 'all') params.set('propertyType', propertyType);
    if (district && district !== 'همه محله‌ها') params.set('district', district);
    if (keyword.trim()) params.set('search', keyword.trim());

    navigate(`${ROUTES.PROPERTIES}?${params.toString()}`);
  };

  return (
    <div
      className={`w-full max-w-4xl mx-auto rounded-3xl bg-white/95 backdrop-blur-md p-4 sm:p-5 border border-border shadow-elevated ${className}`}
    >
      {/* Deal Type Tabs */}
      <div className="flex items-center gap-1 p-1 bg-neutral-background rounded-2xl w-fit mb-4 border border-border/60">
        <button
          type="button"
          onClick={() => setDealType('sale')}
          className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all select-none cursor-pointer ${
            dealType === 'sale'
              ? 'bg-primary-900 text-white shadow-soft'
              : 'text-foreground/70 hover:text-primary-900'
          }`}
        >
          خرید و فروش
        </button>
        <button
          type="button"
          onClick={() => setDealType('rent')}
          className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all select-none cursor-pointer ${
            dealType === 'rent'
              ? 'bg-primary-900 text-white shadow-soft'
              : 'text-foreground/70 hover:text-primary-900'
          }`}
        >
          رهن و اجاره
        </button>
        <button
          type="button"
          onClick={() => setDealType('mortgage')}
          className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all select-none cursor-pointer ${
            dealType === 'mortgage'
              ? 'bg-primary-900 text-white shadow-soft'
              : 'text-foreground/70 hover:text-primary-900'
          }`}
        >
          رهن کامل
        </button>
      </div>

      {/* Main Search Controls Form */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
        {/* 1. Property Type */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-muted-foreground flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-accent" />
            نوع ملک
          </label>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger className="h-11 rounded-xl bg-neutral-background border-border/80">
              <SelectValue placeholder="نوع ملک" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه املاک</SelectItem>
              <SelectItem value="apartment">آپارتمان و پنت‌هاوس</SelectItem>
              <SelectItem value="villa">ویلای مستقل</SelectItem>
              <SelectItem value="commercial">اداری و تجاری</SelectItem>
              <SelectItem value="land">زمین و کلنگی</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 2. District */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-muted-foreground flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-accent" />
            محله / منطقه
          </label>
          <Select value={district} onValueChange={setDistrict}>
            <SelectTrigger className="h-11 rounded-xl bg-neutral-background border-border/80">
              <SelectValue placeholder="محله" />
            </SelectTrigger>
            <SelectContent>
              {QUICK_DISTRICTS.map((dist) => (
                <SelectItem key={dist} value={dist}>
                  {dist}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 3. Keyword / Free Search */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-muted-foreground flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-accent" />
            کلمه کلیدی
          </label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="مثلاً دید کوهستان، روف‌گاردن..."
            className="flex h-11 w-full rounded-xl border border-border/80 bg-neutral-background px-3.5 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>

        {/* 4. Submit Button */}
        <div className="sm:self-end pt-1 sm:pt-0">
          <Button
            type="submit"
            variant="accent"
            size="lg"
            className="w-full h-11 shadow-soft font-bold text-sm"
          >
            <Search className="w-4 h-4 ms-2" />
            جستجوی ملک
          </Button>
        </div>
      </form>
    </div>
  );
}
