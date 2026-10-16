import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Building2, AlertCircle, RefreshCw, SlidersHorizontal } from 'lucide-react';

import { Container } from '@/components/common/Container';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';

import { PropertyFilters } from '@/features/properties/components/PropertyFilters';
import { PropertyGrid } from '@/features/properties/components/PropertyGrid';
import { PropertyListCard } from '@/features/properties/components/PropertyListCard';
import { PropertyCardSkeleton } from '@/features/properties/components/PropertyCardSkeleton';
import { PropertyMapView } from '@/features/properties/components/PropertyMapView';
import { PropertySortSelect } from '@/features/properties/components/PropertySortSelect';
import { PropertyViewSwitcher, PropertyViewMode } from '@/features/properties/components/PropertyViewSwitcher';
import { ActiveFilterChips } from '@/features/properties/components/ActiveFilterChips';
import { PropertyPagination } from '@/features/properties/components/PropertyPagination';

import { useProperties } from '@/features/properties/hooks';
import { PropertySortOption, PropertyFilters as FiltersType } from '@/types/schema';
import { ROUTES } from '@/constants/routes';
import { SITE_CONFIG } from '@/constants/site';
import { toPersianDigits } from '@/lib/formatters';

export default function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // View Mode: 'grid' | 'list' | 'map' (default 'grid')
  const [viewMode, setViewMode] = useState<PropertyViewMode>(
    (searchParams.get('view') as PropertyViewMode) || 'grid'
  );

  // Extract filter parameters from query string
  const filters: FiltersType = useMemo(() => {
    const f: FiltersType = {};

    const dealType = searchParams.get('dealType');
    if (dealType && dealType !== 'all') f.dealType = dealType as any;

    const propertyType = searchParams.get('propertyType');
    if (propertyType && propertyType !== 'all') f.propertyType = propertyType as any;

    const district = searchParams.get('district');
    if (district && district !== 'همه محله‌ها') f.district = district;

    const minPrice = searchParams.get('minPrice');
    if (minPrice) f.minPrice = Number(minPrice);

    const maxPrice = searchParams.get('maxPrice');
    if (maxPrice) f.maxPrice = Number(maxPrice);

    const minArea = searchParams.get('minArea');
    if (minArea) f.minArea = Number(minArea);

    const bedrooms = searchParams.get('bedrooms');
    if (bedrooms) f.bedrooms = Number(bedrooms);

    const search = searchParams.get('search');
    if (search) f.search = search;

    const isFeatured = searchParams.get('isFeatured');
    if (isFeatured === 'true') f.isFeatured = true;

    return f;
  }, [searchParams]);

  // Sort parameter
  const sort = (searchParams.get('sort') as PropertySortOption) || 'newest';

  // Page parameter
  const currentPage = Number(searchParams.get('page')) || 1;
  const pageSize = viewMode === 'map' ? 50 : 9;

  // Query properties
  const { data, isLoading, isError, refetch } = useProperties({
    filters,
    sort,
    page: currentPage,
    pageSize,
  });

  // Handle Sort Change without scroll jumping
  const handleSortChange = (newSort: PropertySortOption) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', newSort);
    newParams.delete('page');
    setSearchParams(newParams, { preventScrollReset: true });
  };

  // Handle View Mode Change
  const handleViewModeChange = (mode: PropertyViewMode) => {
    setViewMode(mode);
    const newParams = new URLSearchParams(searchParams);
    if (mode === 'grid') {
      newParams.delete('view');
    } else {
      newParams.set('view', mode);
    }
    setSearchParams(newParams, { preventScrollReset: true });
  };

  // Handle Pagination Page Change
  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(newPage));
    setSearchParams(newParams);
    // Smooth scroll specifically to results section
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  // Reset all filters
  const handleResetFilters = () => {
    const newParams = new URLSearchParams();
    setSearchParams(newParams, { preventScrollReset: true });
  };

  const totalCount = data?.total || 0;

  return (
    <>
      <Helmet>
        <title>{`فایل‌های ملکی لوکس و اختصاصی (${toPersianDigits(totalCount)} ملک) | ${SITE_CONFIG.brand.name}`}</title>
        <meta
          name="description"
          content={`جستجو و مشاهده لوکس‌ترین پنت‌هاوس‌ها، برج‌باغ‌ها و ویلاهای شمال تهران در ${SITE_CONFIG.brand.name}`}
        />
      </Helmet>

      <div className="py-8 bg-neutral-background min-h-screen">
        <Container>
          {/* Breadcrumb Navigation */}
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={ROUTES.HOME}>صفحه اصلی</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>فایل‌های ملکی شمیرانات</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Page Heading & Total Results Count */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-6 border-b border-border mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-900 tracking-tight">
                فایل‌های ملکی لوکس و انحصاری
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                پنت‌هاوس‌ها، برج‌باغ‌ها و ویلاهای اصیل منطقه یک و دو تهران
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-50 text-primary-900 border border-primary-100 text-xs font-bold font-sans">
                <Building2 className="w-3.5 h-3.5 text-accent-600" />
                <span>{toPersianDigits(totalCount)} ملک یافت شد</span>
              </span>
            </div>
          </div>

          {/* Main Layout: Desktop Sidebar Filters on Start + Results Content on End */}
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Sidebar Filter (Desktop) + Mobile Drawer */}
            <PropertyFilters />

            {/* Results Column */}
            <div className="flex-1 w-full min-w-0 space-y-5">
              {/* Toolbar: Active Filters Chips + View Switcher + Sort Dropdown */}
              <div className="rounded-2xl bg-white p-4 border border-border shadow-soft space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  {/* View Mode Switcher */}
                  <PropertyViewSwitcher
                    viewMode={viewMode}
                    onViewChange={handleViewModeChange}
                  />

                  {/* Sort Selection */}
                  <PropertySortSelect
                    value={sort}
                    onChange={handleSortChange}
                  />
                </div>

                {/* Active Filter Chips */}
                <ActiveFilterChips />
              </div>

              {/* Error State */}
              {isError && (
                <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-white border border-rose-200 shadow-soft space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <AlertCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary-900">
                      خطا در دریافت لیست املاک
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      متاسفانه ارتباط با سرور برقرار نشد. لطفاً مجدداً تلاش فرمایید.
                    </p>
                  </div>
                  <Button variant="primary" onClick={() => refetch()}>
                    <RefreshCw className="w-4 h-4 ms-2" />
                    تلاش مجدد
                  </Button>
                </div>
              )}

              {/* View Mode 1: MAP VIEW */}
              {!isError && viewMode === 'map' && (
                <PropertyMapView properties={data?.data || []} />
              )}

              {/* View Mode 2: LIST VIEW */}
              {!isError && viewMode === 'list' && (
                <div className="space-y-4">
                  {isLoading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                      <PropertyCardSkeleton key={i} />
                    ))
                  ) : data?.data && data.data.length > 0 ? (
                    data.data.map((property) => (
                      <PropertyListCard key={property.id} property={property} />
                    ))
                  ) : (
                    <PropertyGrid
                      properties={[]}
                      isLoading={false}
                      onResetFilters={handleResetFilters}
                    />
                  )}
                </div>
              )}

              {/* View Mode 3: GRID VIEW (Default) */}
              {!isError && viewMode === 'grid' && (
                <PropertyGrid
                  properties={data?.data || []}
                  isLoading={isLoading}
                  skeletonCount={6}
                  onResetFilters={handleResetFilters}
                />
              )}

              {/* Numbered Pagination (Disabled in Map view) */}
              {!isError && viewMode !== 'map' && data && (
                <PropertyPagination
                  currentPage={data.page}
                  totalPages={data.totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
