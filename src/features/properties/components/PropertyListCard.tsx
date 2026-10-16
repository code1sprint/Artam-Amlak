import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Maximize2, BedDouble, Car, Sparkles, Flame, ArrowLeft, Phone } from 'lucide-react';
import { Property } from '@/types/schema';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PriceText } from '@/components/common/PriceText';
import { useFavorites } from '@/context/FavoritesContext';
import { toPersianDigits, formatArea } from '@/lib/formatters';
import { cn } from '@/lib/utils';

export interface PropertyListCardProps {
  property: Property;
  className?: string;
}

export function PropertyListCard({ property, className = '' }: PropertyListCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(property.id);

  const dealTypeLabels: Record<string, { label: string; variant: 'primary' | 'accent' | 'secondary' }> = {
    sale: { label: 'فروش', variant: 'primary' },
    rent: { label: 'رهن و اجاره', variant: 'accent' },
    mortgage: { label: 'رهن کامل', variant: 'secondary' },
  };

  const currentDeal = dealTypeLabels[property.dealType] ?? { label: 'معامله', variant: 'primary' };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(property.id, property.title);
  };

  return (
    <article
      className={cn(
        'group flex flex-col md:flex-row rounded-2xl bg-white border border-border shadow-soft transition-all duration-300 hover:shadow-elevated hover:border-accent/40 overflow-hidden',
        className
      )}
    >
      {/* Image Thumbnail */}
      <div className="relative aspect-[4/3] md:aspect-auto md:w-80 shrink-0 overflow-hidden bg-muted">
        <Link to={`/properties/${property.slug}`} className="block h-full w-full">
          <img
            src={property.images[0]}
            alt={property.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none md:hidden" />
        </Link>

        {/* Badges on Top */}
        <div className="absolute top-3 start-3 end-3 flex items-center justify-between gap-2 pointer-events-none">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge variant={currentDeal.variant} size="sm" className="shadow-xs font-bold">
              {currentDeal.label}
            </Badge>
            {property.isFeatured && (
              <Badge variant="goldFilled" size="sm" className="shadow-xs gap-1">
                <Sparkles className="w-3 h-3" />
                <span>ویژه</span>
              </Badge>
            )}
            {property.isNew && (
              <Badge variant="success" size="sm" className="shadow-xs gap-1">
                <Flame className="w-3 h-3" />
                <span>جدید</span>
              </Badge>
            )}
          </div>

          <button
            type="button"
            onClick={handleFavoriteClick}
            aria-label={favorite ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
            className={cn(
              'pointer-events-auto flex h-9 w-9 items-center justify-center rounded-xl backdrop-blur-md transition-all duration-200 active:scale-90',
              favorite
                ? 'bg-rose-500 text-white shadow-soft'
                : 'bg-white/80 text-foreground hover:bg-white hover:text-rose-500 shadow-xs'
            )}
          >
            <Heart className={cn('h-4 w-4 transition-transform', favorite && 'fill-white scale-110')} />
          </button>
        </div>
      </div>

      {/* Content Details */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-accent-700">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{property.district}، {property.address}</span>
          </div>

          {/* Title */}
          <Link to={`/properties/${property.slug}`}>
            <h3 className="text-lg font-bold text-primary-900 group-hover:text-accent-700 transition-colors line-clamp-1">
              {property.title}
            </h3>
          </Link>

          {/* Description snippet */}
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {property.description}
          </p>

          {/* Features Preview Chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {property.features.slice(0, 3).map((feat, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-neutral-background border border-border/70 text-[11px] text-slate-600"
              >
                {feat}
              </span>
            ))}
          </div>
        </div>

        {/* Specs & Pricing Footer */}
        <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Specs */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5" title="متراژ">
              <Maximize2 className="w-4 h-4 text-accent-600" />
              <span className="font-semibold text-foreground">{formatArea(property.area)}</span>
            </div>
            <div className="h-3 w-px bg-border" />
            <div className="flex items-center gap-1.5" title="تعداد خواب">
              <BedDouble className="w-4 h-4 text-accent-600" />
              <span className="font-semibold text-foreground">{toPersianDigits(property.bedrooms)} خواب</span>
            </div>
            <div className="h-3 w-px bg-border" />
            <div className="flex items-center gap-1.5" title="تعداد پارکینگ">
              <Car className="w-4 h-4 text-accent-600" />
              <span className="font-semibold text-foreground">{toPersianDigits(property.parking)} پارکینگ</span>
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="flex items-center justify-between sm:justify-end gap-4">
            <div className="text-start sm:text-end">
              {property.dealType === 'rent' ? (
                <div>
                  <span className="text-[10px] text-muted-foreground block">
                    ودیعه: {toPersianDigits(property.deposit ? property.deposit / 1_000_000_000 : 0)} م.ت
                  </span>
                  <PriceText amount={property.rent} size="sm" prefix="اجاره:" suffix="ماهانه" />
                </div>
              ) : (
                <div>
                  <span className="text-[10px] text-muted-foreground block">قیمت کل:</span>
                  <PriceText amount={property.price} size="md" readableUnit />
                </div>
              )}
            </div>

            <Button asChild variant="primary" size="sm" className="shadow-xs shrink-0">
              <Link to={`/properties/${property.slug}`}>
                مشاهده جزئیات
                <ArrowLeft className="w-3.5 h-3.5 me-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
