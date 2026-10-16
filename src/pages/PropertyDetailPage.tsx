import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';
import {
  Heart,
  Share2,
  MapPin,
  Building2,
  Maximize2,
  BedDouble,
  Bath,
  Car,
  Layers,
  Calendar,
  Sparkles,
  Flame,
  CheckCircle2,
  AlertCircle,
  Home,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

import { Container } from '@/components/common/Container';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PriceText } from '@/components/common/PriceText';
import { SectionHeading } from '@/components/common/SectionHeading';

import { PropertyGallery } from '@/features/properties/components/PropertyGallery';
import { PropertyLocationMap } from '@/features/properties/components/PropertyLocationMap';
import { PropertySidebarWidget, PropertyMobileBottomBar } from '@/features/properties/components/PropertySidebarWidget';
import { PropertyCard } from '@/features/properties/components/PropertyCard';
import { PropertyCardSkeleton } from '@/features/properties/components/PropertyCardSkeleton';

import { useProperty, useSimilarProperties } from '@/features/properties/hooks';
import { useAgent } from '@/features/agents/hooks';
import { useFavorites } from '@/context/FavoritesContext';
import { ROUTES } from '@/constants/routes';
import { SITE_CONFIG } from '@/constants/site';
import { toPersianDigits, formatArea } from '@/lib/formatters';

export default function PropertyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [descExpanded, setDescExpanded] = useState(false);

  const { data: property, isLoading, isError } = useProperty(slug);
  const { data: similarProperties } = useSimilarProperties(property, 3);
  const { data: agent } = useAgent(property?.agentId);

  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = property ? isFavorite(property.id) : false;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: property?.title,
          text: property?.description,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('لینک صفحه این ملک در کلیپ‌بورد کپی شد');
    }
  };

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="py-12 bg-neutral-background min-h-screen">
        <Container>
          <div className="space-y-6">
            <div className="h-6 w-64 bg-muted animate-pulse rounded-lg" />
            <div className="h-[460px] w-full bg-muted animate-pulse rounded-3xl" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-10 w-3/4 bg-muted animate-pulse rounded-xl" />
                <div className="h-20 w-full bg-muted animate-pulse rounded-xl" />
              </div>
              <div className="h-96 w-full bg-muted animate-pulse rounded-3xl" />
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // 2. 404 Not Found State
  if (isError || !property) {
    return (
      <div className="py-24 text-center bg-neutral-background min-h-screen flex items-center justify-center">
        <Container>
          <div className="max-w-md mx-auto p-8 rounded-3xl bg-white border border-border shadow-card text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-accent-50 text-accent flex items-center justify-center mx-auto shadow-xs">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h1 className="text-xl font-bold text-primary-900">
              ملک مورد نظر یافت نشد یا واگذار شده است
            </h1>
            <p className="text-xs text-muted-foreground leading-relaxed">
              ممکن است این فایل از فهرست فروش خارج شده باشد یا آدرس اشتباه وارد شده باشد.
            </p>
            <Button asChild variant="primary" className="w-full">
              <Link to={ROUTES.PROPERTIES}>
                <Building2 className="w-4 h-4 ms-2" />
                مشاهده سایر املاک فعال
              </Link>
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  // Deal type label
  const dealTypeLabels: Record<string, { label: string; variant: 'primary' | 'accent' | 'secondary' }> = {
    sale: { label: 'خرید و فروش', variant: 'primary' },
    rent: { label: 'رهن و اجاره', variant: 'accent' },
    mortgage: { label: 'رهن کامل', variant: 'secondary' },
  };
  const currentDeal = dealTypeLabels[property.dealType] ?? { label: 'معامله', variant: 'primary' };

  // JSON-LD structured data for RealEstateListing
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.description,
    url: typeof window !== 'undefined' ? window.location.href : '',
    datePosted: property.createdAt,
    image: property.images,
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'IRR',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.address,
      addressLocality: property.district,
      addressRegion: property.city,
      addressCountry: 'IR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: property.lat,
      longitude: property.lng,
    },
  };

  return (
    <>
      <Helmet>
        <title>{`${property.title} | ${SITE_CONFIG.brand.name}`}</title>
        <meta name="description" content={property.description.slice(0, 160)} />
        <meta property="og:title" content={property.title} />
        <meta property="og:description" content={property.description.slice(0, 160)} />
        <meta property="og:image" content={property.images[0]} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="py-8 bg-neutral-background min-h-screen pb-28 lg:pb-16">
        <Container>
          {/* Breadcrumb Navigation */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={ROUTES.HOME}>صفحه اصلی</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={ROUTES.PROPERTIES}>املاک شمیرانات</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{property.district}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* 1. Gallery Section with Desktop Grid / Mobile Slider & Lightbox */}
          <PropertyGallery images={property.images} title={property.title} />

          {/* 2. Header Information & Actions */}
          <div className="mt-8 pb-6 border-b border-border flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="space-y-3 flex-1">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={currentDeal.variant} size="md" className="font-bold">
                  {currentDeal.label}
                </Badge>
                {property.isFeatured && (
                  <Badge variant="goldFilled" size="md" className="gap-1 font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>فایل ویژه آرتام</span>
                  </Badge>
                )}
                {property.isNew && (
                  <Badge variant="success" size="md" className="gap-1 font-bold">
                    <Flame className="w-3.5 h-3.5" />
                    <span>کلید نخورده نوساز</span>
                  </Badge>
                )}
                <Badge variant="outline" size="md">
                  شناسه: {property.id}
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary-900 tracking-tight leading-tight">
                {property.title}
              </h1>

              {/* Address */}
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-muted-foreground">
                <MapPin className="w-4 h-4 text-accent-700 shrink-0" />
                <span>{property.district}، {property.address}</span>
              </div>
            </div>

            {/* Price & Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 shrink-0">
              {/* Share & Favorite Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="rounded-xl border-border bg-white text-xs font-semibold gap-1.5 shadow-2xs"
                >
                  <Share2 className="w-3.5 h-3.5 text-primary-900" />
                  <span>اشتراک‌گذاری</span>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleFavorite(property.id, property.title)}
                  className={`rounded-xl border-border bg-white text-xs font-semibold gap-1.5 shadow-2xs ${
                    favorite ? 'text-rose-600 bg-rose-50 border-rose-200' : ''
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${favorite ? 'fill-rose-600' : ''}`} />
                  <span>{favorite ? 'نشان شده' : 'علاقه‌مندی'}</span>
                </Button>
              </div>

              {/* Large Price Display */}
              <div className="text-start sm:text-end w-full sm:w-auto p-4 sm:p-0 rounded-2xl bg-primary-50/60 sm:bg-transparent border sm:border-0 border-primary-100">
                {property.dealType === 'rent' ? (
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-muted-foreground font-semibold">ودیعه:</span>
                      <PriceText amount={property.deposit} size="lg" readableUnit />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-muted-foreground font-semibold">اجاره بها:</span>
                      <PriceText amount={property.rent} size="md" suffix="ماهانه" />
                    </div>
                  </div>
                ) : property.dealType === 'mortgage' ? (
                  <div className="space-y-0.5">
                    <span className="text-xs text-muted-foreground font-semibold block">رهن کامل بدون اجاره:</span>
                    <PriceText amount={property.deposit || property.price} size="xl" readableUnit />
                  </div>
                ) : (
                  <div className="space-y-0.5">
                    <span className="text-xs text-muted-foreground font-semibold block">قیمت کل کارشناسی شده:</span>
                    <PriceText amount={property.price} size="xl" readableUnit />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 3. Key Specs Row with Icons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 my-8">
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-border shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-accent-50 text-accent flex items-center justify-center shrink-0">
                <Maximize2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block">متراژ زیربنا</span>
                <span className="text-sm font-bold text-primary-900">{formatArea(property.area)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-border shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-accent-50 text-accent flex items-center justify-center shrink-0">
                <BedDouble className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block">اتاق خواب</span>
                <span className="text-sm font-bold text-primary-900">{toPersianDigits(property.bedrooms)} خواب مستر</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-border shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-accent-50 text-accent flex items-center justify-center shrink-0">
                <Bath className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block">سرویس و حمام</span>
                <span className="text-sm font-bold text-primary-900">{toPersianDigits(property.bathrooms)} سرویس</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-border shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-accent-50 text-accent flex items-center justify-center shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block">پارکینگ سندی</span>
                <span className="text-sm font-bold text-primary-900">{toPersianDigits(property.parking)} پارکینگ باکس</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-border shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-accent-50 text-accent flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block">طبقه واحد</span>
                <span className="text-sm font-bold text-primary-900">
                  {property.floor ? `طبقه ${toPersianDigits(property.floor)}` : 'تک‌واحدی'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-border shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-accent-50 text-accent flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block">سال ساخت</span>
                <span className="text-sm font-bold text-primary-900">
                  {property.buildYear ? toPersianDigits(property.buildYear) : 'نوساز'}
                </span>
              </div>
            </div>
          </div>

          {/* 4. Content Layout: Left Details / Right Sticky Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Columns: Description, Amenities, Specifications, Map */}
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-border shadow-soft space-y-4">
                <h3 className="text-lg font-bold text-primary-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  معرفی و توضیحات تکمیلی ملک
                </h3>

                <div
                  className={`text-sm text-foreground/80 leading-[1.95] text-justify relative ${
                    !descExpanded ? 'line-clamp-4' : ''
                  }`}
                >
                  <p>{property.description}</p>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDescExpanded(!descExpanded)}
                  className="text-xs font-bold text-accent-700 hover:text-accent-800 p-0 h-auto"
                >
                  {descExpanded ? (
                    <span className="flex items-center gap-1">
                      بستن متن توضیحات
                      <ChevronUp className="w-4 h-4" />
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      ادامه مطلب و توضیحات کامل...
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </div>

              {/* Features and Amenities */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-border shadow-soft space-y-5">
                <h3 className="text-lg font-bold text-primary-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  امکانات رفاهی و مشاعات هتلینگ
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {property.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-xl bg-neutral-background border border-border/80 text-xs sm:text-sm font-semibold text-slate-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-accent-600 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Property Specifications Table */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-border shadow-soft space-y-5">
                <h3 className="text-lg font-bold text-primary-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  جدول مشخصات فنی و حقوقی
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 divide-y sm:divide-y-0 text-xs sm:text-sm">
                  <div className="divide-y divide-border/60">
                    <div className="py-3 flex justify-between">
                      <span className="text-muted-foreground">کد شناسه فایل:</span>
                      <span className="font-bold text-primary-900">{property.id}</span>
                    </div>
                    <div className="py-3 flex justify-between">
                      <span className="text-muted-foreground">نوع کاربری:</span>
                      <span className="font-bold text-primary-900">مسکونی / لوکس</span>
                    </div>
                    <div className="py-3 flex justify-between">
                      <span className="text-muted-foreground">متراژ مفید:</span>
                      <span className="font-bold text-primary-900">{formatArea(property.area)}</span>
                    </div>
                    <div className="py-3 flex justify-between">
                      <span className="text-muted-foreground">تعداد اتاق خواب:</span>
                      <span className="font-bold text-primary-900">{toPersianDigits(property.bedrooms)} خواب مستر</span>
                    </div>
                  </div>

                  <div className="divide-y divide-border/60">
                    <div className="py-3 flex justify-between">
                      <span className="text-muted-foreground">وضعیت سند:</span>
                      <span className="font-bold text-emerald-700">تک‌برگ رسمی (استعلام شده)</span>
                    </div>
                    <div className="py-3 flex justify-between">
                      <span className="text-muted-foreground">تعداد پارکینگ سندی:</span>
                      <span className="font-bold text-primary-900">{toPersianDigits(property.parking)} پارکینگ باکس</span>
                    </div>
                    <div className="py-3 flex justify-between">
                      <span className="text-muted-foreground">طبقه / تعداد کل:</span>
                      <span className="font-bold text-primary-900">
                        طبقه {toPersianDigits(property.floor || 1)} از {toPersianDigits(property.totalFloors || 1)}
                      </span>
                    </div>
                    <div className="py-3 flex justify-between">
                      <span className="text-muted-foreground">سیستم سرمایش و گرمایش:</span>
                      <span className="font-bold text-primary-900">چیلر مرکزی و فن‌کویل مستقل</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Location Map with Leaflet */}
              <PropertyLocationMap
                lat={property.lat}
                lng={property.lng}
                title={property.title}
                district={property.district}
                address={property.address}
              />
            </div>

            {/* Right Column: Desktop Sticky Agent & Schedule Visit Sidebar */}
            <div className="hidden lg:block">
              {agent ? (
                <PropertySidebarWidget agent={agent} propertyTitle={property.title} />
              ) : (
                <div className="h-96 rounded-3xl bg-muted animate-pulse" />
              )}
            </div>
          </div>

          {/* 7. Similar Properties Section */}
          {similarProperties && similarProperties.length > 0 && (
            <div className="mt-20 pt-12 border-t border-border">
              <SectionHeading
                align="start"
                badge="پیشنهادات هوشمند"
                title="فایل‌های ملکی مشابه در این منطقه"
                subtitle="گلچینی از واحدهای هم‌رده بر اساس منطقه، متراژ و نوع کاربری"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarProperties.map((item) => (
                  <PropertyCard key={item.id} property={item} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </div>

      {/* 6. Mobile Fixed Bottom Bar */}
      {agent && <PropertyMobileBottomBar agent={agent} propertyTitle={property.title} />}
    </>
  );
}
