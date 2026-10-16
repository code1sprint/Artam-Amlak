import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, CheckCircle2, ShieldCheck, PhoneCall } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { SITE_CONFIG } from '@/constants/site';
import { HomeMotionWrapper } from './HomeMotionWrapper';

export function SubmitPropertyCtaSection() {
  return (
    <section className="py-20 md:py-28 bg-[#091D33] text-white relative overflow-hidden">
      {/* Decorative Golden Ambient Lighting */}
      <div className="absolute top-0 end-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 rounded-full bg-accent-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 start-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-primary-500/15 blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <HomeMotionWrapper>
          <div className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 lg:p-16 bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-elevated text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-500/15 border border-accent-400/40 text-accent-300 text-xs sm:text-sm font-bold shadow-xs">
              <Sparkles className="w-4 h-4 text-accent-400" />
              <span>فروش و اجاره انحصاری املاک لوکس</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.3]">
                ملک فاخر خود را به معتبرترین
                <span className="block text-accent-400 mt-2">
                  شبکه خریداران و سرمایه‌گذاران بسپارید
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-[1.9]">
                اگر مالک پنت‌هاوس، ویلا یا مستغلاتی شاخص در منطقه یک هستید، کارشناسان ارشد آرتام با ارزیابی دقیق مهندسی و بازاریابی محرمانه یا عمومی، بهترین نتیجه را برای شما رقم خواهند زد.
              </p>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-slate-200">
              <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-accent-400 shrink-0" />
                <span>کارشناسی رایگان قیمت‌گذاری</span>
              </div>
              <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                <ShieldCheck className="w-4 h-4 text-accent-400 shrink-0" />
                <span>امکان فروش کاملاً محرمانه</span>
              </div>
              <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-accent-400 shrink-0" />
                <span>عکاسی و فیلم‌برداری حرفه‌ای</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button asChild size="lg" variant="accent" className="shadow-elevated font-bold text-sm sm:text-base">
                <Link to={ROUTES.SUBMIT_PROPERTY}>
                  <Sparkles className="w-4 h-4 ms-2" />
                  ثبت رایگان مشخصات ملک
                  <ArrowLeft className="w-4 h-4 me-2" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-md font-bold text-sm sm:text-base"
              >
                <a href={`tel:${SITE_CONFIG.contacts.phoneRaw}`}>
                  <PhoneCall className="w-4 h-4 ms-2 text-accent-400" />
                  مشاوره تلفنی با مدیر دفتر
                </a>
              </Button>
            </div>
          </div>
        </HomeMotionWrapper>
      </Container>
    </section>
  );
}
