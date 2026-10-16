import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Maximize2, BedDouble, Car, Sparkles, Flame } from 'lucide-react';
import { Property } from '@/types/schema';
import { Badge } from '@/components/ui/badge';
import { PriceText } from '@/components/common/PriceText';
import { useFavorites } from '@/context/FavoritesContext';
import { toPersianDigits, formatArea } from '@/lib/formatters';
import { cn } from '@/lib/utils';

export interface PropertyCardProps {
  property: Property;
  className?: string;
}

export function PropertyCard({ property, className }: PropertyCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(property.id);

  // Deal type label
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
        'group relative flex flex-col rounded-2xl bg-white border border-border/80 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-elevated hover:border-accent/40 overflow-hidden',
        className
      )}
    >
      <Link to={`/properties/${property.slug}`} className="flex flex-col h-full">
        {/* Image Container with 4:3 Aspect Ratio */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          <img
            src={property.images[0]}
            alt={property.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-950/70 via-transparent to-black/20 pointer-events-none" />

          {/* Badges on Top */}
          <div className="absolute top-3 start-3 end-3 flex items-center justify-between gap-2 pointer-events-none">
            <div className="flex flex-wrap items-center gap-1.5">
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

            {/* Favorite Bookmark Button */}
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
              <Heart
                className={cn('h-4 w-4 transition-transform', favorite && 'fill-white scale-110')}
              />
            </button>
          </div>

          {/* District & Location on Bottom of Image */}
          <div className="absolute bottom-3 start-3.5 flex items-center gap-1.5 text-white text-xs font-semibold drop-shadow-md">
            <MapPin className="w-3.5 h-3.5 text-accent-400 shrink-0" />
            <span>{property.district}، {property.city}</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="flex flex-col flex-1 p-5 space-y-4">
          {/* Title */}
          <h3 className="text-base font-bold text-primary-900 line-clamp-1 group-hover:text-accent-700 transition-colors">
            {property.title}
          </h3>

          {/* Specifications Bar (Area, Bedrooms, Parking) */}
          <div className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-neutral-background border border-border/70 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5" title="متراژ">
              <Maximize2 className="w-3.5 h-3.5 text-accent-600" />
              <span className="font-semibold text-foreground">{formatArea(property.area)}</span>
            </div>

            <div className="h-3 w-px bg-border" />

            <div className="flex items-center gap-1.5" title="تعداد خواب">
              <BedDouble className="w-3.5 h-3.5 text-accent-600" />
              <span className="font-semibold text-foreground">
                {toPersianDigits(property.bedrooms)} خواب
              </span>
            </div>

            <div className="h-3 w-px bg-border" />

            <div className="flex items-center gap-1.5" title="تعداد پارکینگ">
              <Car className="w-3.5 h-3.5 text-accent-600" />
              <span className="font-semibold text-foreground">
                {toPersianDigits(property.parking)} پارکینگ
              </span>
            </div>
          </div>

          {/* Pricing Row */}
          <div className="mt-auto pt-2 flex items-baseline justify-between border-t border-border/60">
            {property.dealType === 'rent' ? (
              <div className="flex flex-col">
                <div className="text-[11px] text-muted-foreground">
                  ودیعه: <span className="font-bold text-foreground">{toPersianDigits(property.deposit ? property.deposit / 1_000_000_000 : 0)} م.ت</span>
                </div>
                <PriceText
                  amount={property.rent}
                  size="sm"
                  prefix="اجاره:"
                  suffix="ماهانه"
                />
              </div>
            ) : property.dealType === 'mortgage' ? (
              <div className="flex flex-col">
                <span className="text-[11px] text-muted-foreground">رهن کامل:</span>
                <PriceText amount={property.deposit || property.price} size="md" readableUnit />
              </div>
            ) : (
              <div className="flex flex-col">
                <span className="text-[11px] text-muted-foreground">قیمت کل:</span>
                <PriceText amount={property.price} size="md" readableUnit />
              </div>
            )}

            <span className="text-xs font-bold text-accent-700 group-hover:translate-x-[-2px] transition-transform">
              مشاهده جزئیات &larr;
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
