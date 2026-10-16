import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Users, Award, ShieldCheck, Sparkles, PhoneCall, ArrowLeft, CheckCircle2 } from 'lucide-react';

import { Container } from '@/components/common/Container';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Button } from '@/components/ui/button';
import { AgentCard } from '@/features/agents/components/AgentCard';
import { useAgents } from '@/features/agents/hooks';
import { SITE_CONFIG } from '@/constants/site';
import { ROUTES } from '@/constants/routes';
import { toPersianDigits } from '@/lib/formatters';

export default function AgentsPage() {
  const { data: agents, isLoading } = useAgents();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('همه تخصص‌ها');

  const specialtiesFilter = [
    'همه تخصص‌ها',
    'زعفرانیه',
    'فرشته',
    'لواسانات',
    'پنت‌هاوس‌های مارک‌دار',
    'رهن و اجاره ارزی و ریالی',
    'تجاری و اداری شمیرانات',
  ];

  const filteredAgents = agents?.filter((agent) => {
    if (selectedSpecialty === 'همه تخصص‌ها') return true;
    return agent.specialties.some((s) => s.includes(selectedSpecialty) || selectedSpecialty.includes(s));
  });

  return (
    <>
      <Helmet>
        <title>{`مشاوران ارشد و کارشناسان املاک | ${SITE_CONFIG.brand.name}`}</title>
        <meta
          name="description"
          content={`آشنایی با تیم نخبگان، کارشناسان معماری و مشاوران حقوقی کارگزاری املاک لوکس آرتام در شمیرانات`}
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
                <BreadcrumbPage>مشاوران ارشد</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Heading */}
          <div className="pb-8 border-b border-border mb-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-50 text-accent-700 border border-accent-200 text-xs font-bold shadow-xs mb-3">
              <Sparkles className="w-3.5 h-3.5 text-accent-600" />
              <span>نخبگان معاملات کلان و دیپلماتیک شمیرانات</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-primary-900 tracking-tight leading-tight">
              تیم کارشناسان ارشد، معماران و وکلای ملکی آرتام
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed">
              هر یک از مشاوران ما نماینده انحصاری محله‌های شاخص منطقه یک بوده و با پشتوانه علمی، اشراف کامل به ریشه اسناد و اخلاق حرفه‌ای همراه شما هستند.
            </p>
          </div>

          {/* Specialty Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-xs font-bold text-primary-900 me-2">فیلتر بر اساس تخصص:</span>
            {specialtiesFilter.map((spec) => {
              const isActive = selectedSpecialty === spec;
              return (
                <button
                  key={spec}
                  type="button"
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-primary-900 text-white shadow-soft'
                      : 'bg-white text-muted-foreground hover:text-primary-900 border border-border shadow-2xs'
                  }`}
                >
                  {spec}
                </button>
              );
            })}
          </div>

          {/* Agents Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-96 rounded-2xl bg-muted/60 animate-pulse" />
                ))
              : filteredAgents?.map((agent) => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
          </div>

          {/* Why Consult with an Artam Agent */}
          <div className="rounded-3xl bg-white p-8 sm:p-12 border border-border shadow-soft mb-16 space-y-6">
            <div className="max-w-2xl">
              <span className="text-xs text-accent-700 font-bold uppercase tracking-wider block mb-1">
                استاندارد کارشناسی
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-primary-900">
                چرا مشاوره با کارشناسان آرتام سرنوشت‌ساز است؟
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary-900 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-accent-600" />
                  <span>دسترسی به فایل‌های انحصاری</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  بسیاری از پنت‌هاوس‌ها و ویلاهای اصیل به دلایل امنیتی در وب‌سایت‌ها آگهی نمی‌شوند و صرفاً در اختیار کارشناسان مقیم ما قرار دارند.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary-900 font-bold text-sm">
                  <Award className="w-5 h-5 text-accent-600" />
                  <span>قیمت‌گذاری دقیق و مستند</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  جلوگیری از زیان‌های ناشی از هیجانات قیمتی با بهره‌گیری از مدل‌های اقتصادی ارزش‌گذاری متریال و زمین.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary-900 font-bold text-sm">
                  <Users className="w-5 h-5 text-accent-600" />
                  <span>نظارت حقوقی در اتاق جلسات</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  حضور وکلای پایه یک دادگستری در تمامی جلسات مذاکره و انتقال سند تک‌برگ در دفاتر اسناد رسمی معتبر.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
