import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Heart, Building2 } from 'lucide-react';

import { Container } from '@/components/common/Container';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/features/properties/components/PropertyCard';
import { PropertyCardSkeleton } from '@/features/properties/components/PropertyCardSkeleton';
import { useFavorites } from '@/context/FavoritesContext';
import { usePropertiesByIds } from '@/features/properties/hooks';
import { ROUTES } from '@/constants/routes';
import { SITE_CONFIG } from '@/constants/site';
import { toPersianDigits } from '@/lib/formatters';

export default function FavoritesPage() {
  const { favorites, favoritesCount } = useFavorites();
  const { data: properties, isLoading, isError } = usePropertiesByIds(favorites);

  return (
    <>
      <Helmet>
        <title>{`علاقه‌مندی‌ها | ${SITE_CONFIG.brand.name}`}</title>
        <meta name="description" content="فهرست املاک ذخیره‌شده در علاقه‌مندی‌های شما." />
      </Helmet>

      <div className="py-8 bg-neutral-background min-h-screen">
        <Container>
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={ROUTES.HOME}>صفحه اصلی</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>علاقه‌مندی‌ها</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="pb-8 border-b border-border mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-accent-700 text-xs font-bold mb-2">
                <Heart className="w-4 h-4" />
                ذخیره شده‌ها
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-primary-900 tracking-tight">
                علاقه‌مندی‌های من
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                {favoritesCount > 0
                  ? `${toPersianDigits(favoritesCount)} ملک ذخیره شده`
                  : 'هنوز ملکی به علاقه‌مندی‌ها اضافه نکرده‌اید'}
              </p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link to={ROUTES.PROPERTIES}>
                <Building2 className="w-4 h-4 ms-1.5" />
                مشاهده همه فایل‌ها
              </Link>
            </Button>
          </div>

          {favoritesCount === 0 && (
            <div className="rounded-3xl border border-border bg-white py-20 px-6 text-center space-y-4 shadow-soft">
              <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto">
                <Heart className="w-7 h-7 text-muted-foreground" />
              </div>
              <h2 className="text-lg font-bold text-primary-900">لیست علاقه‌مندی خالی است</h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                با کلیک روی آیکون قلب در کارت یا صفحه جزئیات ملک، فایل‌های مورد علاقه خود را اینجا ذخیره کنید.
              </p>
              <Button asChild variant="primary">
                <Link to={ROUTES.PROPERTIES}>رفتن به لیست املاک</Link>
              </Button>
            </div>
          )}

          {favoritesCount > 0 && isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: Math.min(favoritesCount, 6) }).map((_, i) => (
                <PropertyCardSkeleton key={i} />
              ))}
            </div>
          )}

          {favoritesCount > 0 && isError && (
            <p className="text-sm text-rose-600 text-center py-12">خطا در بارگذاری علاقه‌مندی‌ها.</p>
          )}

          {favoritesCount > 0 && !isLoading && properties && (
            <>
              {properties.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <p className="font-bold text-primary-900">ملک‌های ذخیره‌شده دیگر در فهرست نیستند</p>
                  <p className="text-sm text-muted-foreground">ممکن است فایل‌ها واگذار یا حذف شده باشند.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              )}
            </>
          )}
        </Container>
      </div>
    </>
  );
}
