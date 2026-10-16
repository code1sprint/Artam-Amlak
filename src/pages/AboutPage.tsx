import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Building2,
  ShieldCheck,
  Award,
  Sparkles,
  Users,
  Compass,
  CheckCircle2,
  ArrowLeft,
  FileCheck2,
  Lock,
  Scale,
  Gem,
  PhoneCall,
  Maximize2,
  X,
} from 'lucide-react';

import { Container } from '@/components/common/Container';
import { BrandLogo } from '@/components/common/BrandLogo';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { StatItem } from '@/components/common/StatItem';
import { AgentCard } from '@/features/agents/components/AgentCard';
import { useAgents } from '@/features/agents/hooks';
import { ROUTES } from '@/constants/routes';
import { SITE_CONFIG } from '@/constants/site';
import { toPersianDigits } from '@/lib/formatters';

export default function AboutPage() {
  const { data: agents } = useAgents();
  const [selectedCert, setSelectedCert] = useState<{ title: string; issuer: string; image: string; desc: string } | null>(null);

  const values = [
    {
      icon: Scale,
      title: 'شفافیت و اصالت حقوقی',
      desc: 'استعلام قطعی اسناد کاداستر و پایان‌کار پیش از عرضه عمومی؛ ما تنها ملک‌هایی با سند رسمی تک‌برگ و بدون ریشه را معامله می‌کنیم.',
    },
    {
      icon: Lock,
      title: 'امانتداری و محرمانگی مطلق',
      desc: 'صیانت از حریم خصوصی سرمایه‌گذاران، دیپلمات‌ها و مالکان پنت‌هاوس‌ها با سیستم معاملات خصوصی (Off-Market).',
    },
    {
      icon: Gem,
      title: 'کمال‌گرایی در گزینش معماری',
      desc: 'ارزیابی دقیق متریال، نقشه‌های تفکیکی، سازندگان معتبر و پایداری سازه توسط تیم کارشناسان ارشد معماری.',
    },
    {
      icon: Compass,
      title: 'مشاوره داده‌محور و سرمایه‌گذاری',
      desc: 'ارائه تحلیل‌های منصفانه بازدهی اقتصادی و قیمت‌گذاری مهندسی بر پایه داده‌های ثبت‌شده معاملات واقعی شمیرانات.',
    },
  ];

  const stats = [
    { label: 'پنت‌هاوس و ویلای معامله‌شده', value: '+۳۸۰', icon: Building2, desc: 'در زعفرانیه، فرشته، الهیه و لواسان' },
    { label: 'رضایت خریداران و سرمایه‌گذاران', value: '۹۹٫۴٪', icon: Award, desc: 'استعلام کتبی پس از ثبت سند رسمی' },
    { label: 'مشاوران حقوقی و مهندسان مقیم', value: '۲۴', icon: Users, desc: 'متخصصین فعال منطقه یک' },
    { label: 'سابقه درخشان در شمیرانات', value: '۱۵ سال', icon: ShieldCheck, desc: 'پیشرو در خدمات معاملات کلان' },
  ];

  const certifications = [
    {
      title: 'پروانه تخصصی درجه یک کارگزاری املاک',
      issuer: 'اتحادیه صنف مشاوران املاک تهران',
      desc: 'مجوز رسمی درجه یک فعالیت تخصصی در حوزه معاملات املاک و مستغلات لوکس',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'گواهینامه بین‌المللی مدیریت کیفیت ISO 9001:2015',
      issuer: 'نهاد صدور گواهی استاندارد TUV',
      desc: 'استاندارد جهانی مدیریت کیفیت در ارائه خدمات کارگزاری و رضایت مشتریان',
      image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'تندیس زرین برند برتر املاک فاخر پایتخت',
      issuer: 'اجلاس ملی برترین‌های صنعت ساختمان',
      desc: 'برگزیده برترین کارگزاری تخصصی در صیانت از حقوق خریداران و فروشندگان',
      image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'گواهی صلاحیت حقوقی تنظیم قراردادهای رسمی',
      issuer: 'کانون وکلای دادگستری و مرکز داوری ملکی',
      desc: 'تاییدیه انطباق پیش‌نویس‌های حقوقی مبایعه‌نامه‌ها با قوانین مدنی و ثبتی کشور',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    },
  ];

  return (
    <>
      <Helmet>
        <title>{`درباره ما | تاریخچه و استانداردهای ${SITE_CONFIG.brand.name}`}</title>
        <meta
          name="description"
          content={`آشنایی با تاریخچه ۱۵ ساله، تعهد به کیفیت، تیم کارشناسان ارشد و مجوزهای رسمی کارگزاری ${SITE_CONFIG.brand.name}`}
        />
      </Helmet>

      {/* 1. Short Hero */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-primary-50/70 via-white to-neutral-background border-b border-border/80">
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
                <BreadcrumbPage>درباره ما</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-50 text-accent-700 border border-accent-200 text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-accent-600" />
              <span>پیشگام در ارزیابی و معاملات فاخر شمیرانات</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-primary-900 tracking-tight leading-tight">
              داستان اصالت و اعتمادی که در قلب پایتخت ساختیم
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {SITE_CONFIG.brand.description}
            </p>
          </div>
        </Container>
      </section>

      {/* 2. Story Section (Story Text + Headquarters Image) */}
      <section className="py-16 md:py-24 bg-white border-b border-border/70">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Story Text */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 text-primary-900 text-xs font-bold">
                <Building2 className="w-3.5 h-3.5 text-accent-600" />
                <span>تاریخچه تاسیس و چشم‌انداز</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-primary-900 leading-snug">
                از یک ایده جسورانه تا معتبرترین نام در املاک فاخر
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-foreground/80 leading-[1.95] text-justify">
                <p>
                  کارگزاری املاک لوکس آرتام در سال ۱۳۸۹ با هدفی متمایز بنیان نهاده شد: ارتقای استانداردهای سنتی بازار مسکن به سطحی درخور سازه‌های شاهکار معماری شمیرانات. در دورانی که معاملات املاک گران‌قیمت با چالش‌های متعدد حقوقی و نبود کارشناسی دقیق فنی مواجه بود، آرتام با ادغام دانش مهندسی معماری و حقوق تخصصی ثبتی، مسیری نو را آغاز کرد.
                </p>
                <p>
                  امروز پس از بیش از یک دهه و نیم فعالیت مستمر، ما به معتمدترین همراه سرمایه‌گذاران نام‌آشنا، دیپلمات‌ها، پزشکان و مدیران ارشد کشور در محله‌های زعفرانیه، فرشته، الهیه و نیاوران تبدیل شده‌ایم. پرونده بیش از صدها معامله کلان بدون حتی یک مورد دعوای حقوقی، گواهی روشن بر تعهد ما به اصالت و شفافیت است.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-neutral-background border border-border">
                  <span className="text-2xl font-black text-primary-900 block font-sans">۱۰۰٪</span>
                  <span className="text-xs text-muted-foreground mt-0.5 block">استعلام رسمی اسناد تک‌برگ</span>
                </div>
                <div className="p-4 rounded-2xl bg-neutral-background border border-border">
                  <span className="text-2xl font-black text-primary-900 block font-sans">۰٪</span>
                  <span className="text-xs text-muted-foreground mt-0.5 block">ریسک یا مناقشه حقوقی</span>
                </div>
              </div>
            </div>

            {/* Headquarters Image with Luxury Frame */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-elevated border-4 border-white aspect-[4/3] bg-muted">
                <img
                  src="/images/about/hq-office.jpg"
                  alt="دفتر مرکزی کارگزاری آرتام در زعفرانیه"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 start-6 end-6 text-white">
                  <span className="text-xs text-accent-300 font-bold block mb-1">دفتر مرکزی کارگزاری آرتام</span>
                  <span className="text-sm font-semibold block">برج آرتام، زعفرانیه، خیابان مقدس اردبیلی</span>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -start-6 hidden sm:flex items-center gap-3 p-4 rounded-2xl bg-white border border-border shadow-elevated">
                <BrandLogo variant="mark" size={48} asLink={false} />
                <div>
                  <span className="text-xs font-bold text-primary-900 block">پروانه رسمی درجه یک</span>
                  <span className="text-[11px] text-muted-foreground font-sans">شناسه صنفی: ۱۰۹۹۲۴۵</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Core Values Section */}
      <section className="py-16 md:py-24 bg-neutral-background border-b border-border/70">
        <Container>
          <SectionHeading
            badge="ارزش‌های بنیادین"
            title="اصولی که هرگز بر سر آنها سازش نمی‌کنیم"
            subtitle="ستون‌های اخلاقی و استانداردهای حرفه‌ای که مسیر حرکت تک‌تک اعضای خانواده آرتام را مشخص می‌کنند"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="p-7 rounded-3xl bg-white border border-border shadow-soft transition-all duration-300 hover:shadow-card hover:-translate-y-1 space-y-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-accent-50 text-accent-700 flex items-center justify-center border border-accent-200/60 shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-primary-900">{v.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 4. Statistics Section */}
      <section className="py-16 md:py-20 bg-white border-b border-border/70">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, idx) => (
              <StatItem
                key={idx}
                icon={s.icon}
                value={s.value}
                label={s.label}
                description={s.desc}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Team Section */}
      <section className="py-16 md:py-24 bg-neutral-background border-b border-border/70">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <SectionHeading
              align="start"
              className="mb-0"
              badge="تیم نخبگان"
              title="مشاوران ارشد و وکلای مقیم آرتام"
              subtitle="ترکیبی از تجربه، بینش حقوقی و تسلط همه‌جانبه بر نفیس‌ترین املاک شمیرانات"
            />
            <Button asChild variant="outline" size="md">
              <Link to={ROUTES.AGENTS}>
                مشاهده صفحه همه مشاوران
                <ArrowLeft className="w-4 h-4 me-2" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents?.slice(0, 3).map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </Container>
      </section>

      {/* 6. Licenses & Certifications Gallery */}
      <section className="py-16 md:py-24 bg-white border-b border-border/70">
        <Container>
          <SectionHeading
            badge="اعتبار و صلاحیت"
            title="مجوزهای رسمی و گواهینامه‌های استاندارد"
            subtitle="مدارک رسمی فعالیت حرفه‌ای، استانداردسازی کیفیت و صلاحیت‌های حقوقی کارگزاری آرتام"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedCert(cert)}
                className="group relative flex flex-col rounded-2xl bg-neutral-background border border-border shadow-soft overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-card hover:border-accent/40"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Maximize2 className="w-6 h-6 text-accent" />
                  </div>
                </div>

                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-accent-700 block mb-1">
                      {cert.issuer}
                    </span>
                    <h4 className="text-sm font-bold text-primary-900 line-clamp-2 leading-snug">
                      {cert.title}
                    </h4>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 pt-2 border-t border-border/60">
                    {cert.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Certificate Lightbox Dialog */}
          {selectedCert && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              onClick={() => setSelectedCert(null)}
            >
              <div
                className="max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-4 start-4 p-2 rounded-xl bg-muted hover:bg-neutral-background text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-muted">
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <h3 className="text-lg font-bold text-primary-900">{selectedCert.title}</h3>
                  <p className="text-xs text-accent-700 font-semibold">{selectedCert.issuer}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {selectedCert.desc}
                  </p>
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* 7. Final Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary-950 via-[#0F2A47] to-primary-950 text-white relative overflow-hidden">
        <Container className="relative z-10 text-center max-w-3xl space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-accent text-primary-950 flex items-center justify-center mx-auto font-bold shadow-soft">
            <Building2 className="w-7 h-7" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            مشاوره حضوری در فضایی اختصاصی و آرام
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto">
            جهت بررسی فرصت‌های سرمایه‌گذاری یا واگذاری انحصاری پنت‌هاوس‌ها و ویلاها، پذیرای حضور شما در دفتر مرکزی آرتام واقع در زعفرانیه هستیم.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Button asChild size="lg" variant="accent" className="font-bold shadow-soft">
              <a href={`tel:${SITE_CONFIG.contacts.phoneRaw}`}>
                <PhoneCall className="w-4 h-4 ms-2 text-primary-950" />
                هماهنگی جلسه با مدیر دفتر: {SITE_CONFIG.contacts.phone}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Link to={ROUTES.PROPERTIES}>
                مشاهده فایل‌های ملکی
                <ArrowLeft className="w-4 h-4 me-2" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
