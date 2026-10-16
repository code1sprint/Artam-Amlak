import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Building2, Trees, Landmark, Briefcase } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Badge } from '@/components/ui/badge';
import { MOCK_PROPERTIES } from '@/data/properties.mock';
import { ROUTES } from '@/constants/routes';
import { withBase } from '@/lib/base';
import { toPersianDigits } from '@/lib/formatters';
import { HomeMotionWrapper } from './HomeMotionWrapper';

export function PropertyCategoriesSection() {
  const getCount = (type: string) => MOCK_PROPERTIES.filter((p) => p.propertyType === type).length;

  const categories = [
    {
      id: 'apartment',
      title: 'آپارتمان و پنت‌هاوس',
      enTitle: 'Luxury Penthouses & Apartments',
      count: getCount('apartment'),
      image: withBase('/images/categories/apartment.jpg'),
      description: 'پنت‌هاوس‌های مجلل، برج‌باغ‌ها و واحدهای نوساز با دید ابدی البرز',
      icon: Building2,
      path: `${ROUTES.PROPERTIES}?propertyType=apartment`,
    },
    {
      id: 'villa',
      title: 'ویلای مستقل و مدرن',
      enTitle: 'Exclusive Modern Villas',
      count: getCount('villa'),
      image: withBase('/images/categories/villa.jpg'),
      description: 'عمارت‌های تریپلکس در لواسانات، نیاوران و شهرک‌های اختصاصی',
      icon: Trees,
      path: `${ROUTES.PROPERTIES}?propertyType=villa`,
    },
    {
      id: 'commercial',
      title: 'موقعیت‌های اداری و تجاری',
      enTitle: 'Commercial & Flagship Real Estate',
      count: getCount('commercial'),
      image: withBase('/images/categories/commercial.jpg'),
      description: 'ساختمان‌های مستقل اداری، هلدینگ‌ها و مغازه‌های برند شمیرانات',
      icon: Briefcase,
      path: `${ROUTES.PROPERTIES}?propertyType=commercial`,
    },
    {
      id: 'land',
      title: 'زمین و کلنگی ارزنده',
      enTitle: 'Prime Residential Land',
      count: getCount('land'),
      image: withBase('/images/categories/land.jpg'),
      description: 'اراضی مرغوب با دستور نقشه، مناسب ساخت پروژه‌های شاخص',
      icon: Landmark,
      path: `${ROUTES.PROPERTIES}?propertyType=land`,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-neutral-background">
      <Container>
        <HomeMotionWrapper>
          <SectionHeading
            badge="تنوع دسته‌بندی‌ها"
            title="کاوش در شاهکارهای معماری"
            subtitle="فرصت‌های استثنایی خرید، رهن و سرمایه‌گذاری تفکیک‌شده بر اساس سلیقه و کاربری شما"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.id}
                  to={cat.path}
                  className="group relative h-96 sm:h-[420px] rounded-3xl overflow-hidden shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-elevated border border-border/80 flex flex-col justify-between p-6"
                >
                  {/* Background Image */}
                  <img
                    src={cat.image}
                    alt={cat.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/60 to-black/30 group-hover:via-primary-950/40 transition-colors duration-500" />

                  {/* Top Header Badge */}
                  <div className="relative z-10 flex items-center justify-between">
                    <Badge variant="goldFilled" size="sm" className="font-sans font-bold shadow-xs">
                      {toPersianDigits(cat.count)} ملک فعال
                    </Badge>
                    <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md text-white flex items-center justify-center border border-white/20 group-hover:bg-accent group-hover:text-primary-950 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="relative z-10 space-y-2">
                    <span className="text-[10px] uppercase tracking-wider text-accent-300 font-sans font-bold block">
                      {cat.enTitle}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-accent transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>

                    <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-accent-400 group-hover:text-white transition-colors">
                      <span>مشاهده فایل‌ها</span>
                      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </HomeMotionWrapper>
      </Container>
    </section>
  );
}
