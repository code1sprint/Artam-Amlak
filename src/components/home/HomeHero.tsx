import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, Building2, ShieldCheck, ArrowLeft, PhoneCall } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/ui/button';
import { QuickSearchBar } from '@/features/properties/components/QuickSearchBar';
import { ROUTES } from '@/constants/routes';
import { SITE_CONFIG } from '@/constants/site';
import { withBase } from '@/lib/base';

export function HomeHero() {
  const shouldReduceMotion = useReducedMotion();

  const heroImage = withBase('/images/hero/home-hero.jpg');

  return (
    <section className="relative w-full overflow-visible bg-primary-950 pb-20 md:pb-28">
      {/* Background Image with High Fetch Priority */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroImage}
          alt={SITE_CONFIG.brand.name}
          fetchPriority="high"
          className="h-full w-full object-cover object-center scale-105"
        />
        {/* Deep Navy Luxury Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2139] via-[#0F2A47]/85 to-[#061423]/90" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-primary-950/60" />
      </div>

      {/* Hero Content */}
      <Container className="relative z-10 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-500/15 border border-accent-400/40 text-accent-300 text-xs sm:text-sm font-bold backdrop-blur-md shadow-xs">
            <Sparkles className="w-4 h-4 text-accent-400" />
            <span>مرجع انحصاری املاک فوق‌لوکس و دیپلماتیک {SITE_CONFIG.contacts.city}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.28]">
            تجربه اصالت و شکوه در برترین
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-accent-300 via-accent-400 to-accent-200">
              پنت‌هاوس‌ها و ویلاهای شمیرانات
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-[1.9] font-normal">
            دسترسی بدون واسطه به نفیس‌ترین سازه‌های زعفرانیه، فرشته و نیاوران با استعلام ۱۰۰٪ سند تک‌برگ و همراهی تخصصی وکلای ملکی.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button asChild size="lg" variant="accent" className="shadow-elevated font-bold text-sm sm:text-base">
              <Link to={ROUTES.PROPERTIES}>
                <Building2 className="w-5 h-5 ms-2 text-primary-950" />
                مشاهده فایل‌های ملکی
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-md font-bold text-sm sm:text-base"
            >
              <Link to={ROUTES.SUBMIT_PROPERTY}>
                <Sparkles className="w-4 h-4 ms-2 text-accent-400" />
                ثبت رایگان ملک
              </Link>
            </Button>
          </div>

          {/* Trust points */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-accent" />
              ضمانت اصالت اسناد تک‌برگ
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-accent" />
              فایل‌های انحصاری و شخصی
            </span>
            <span className="flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-accent" />
              مشاوره رایگان تخصصی
            </span>
          </div>
        </div>
      </Container>

      {/* Floating QuickSearchBar: Half overlapping bottom edge */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 -mb-24 sm:-mb-20">
        <QuickSearchBar />
      </div>
    </section>
  );
}
