import React from 'react';
import { ShieldCheck, UserCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { IconBox } from '@/components/common/IconBox';
import { HomeMotionWrapper } from './HomeMotionWrapper';

export function WhyUsSection() {
  const advantages = [
    {
      icon: ShieldCheck,
      title: 'استعلام قطعی اصالت اسناد',
      description: 'تمامی فایل‌ها پیش از معرفی، توسط دپارتمان حقوقی استعلام کاداستر شده و سلامت صددرصدی سند تک‌برگ تضمین می‌گردد.',
      badge: 'ضمانت حقوقی',
    },
    {
      icon: UserCheck,
      title: 'مشاوران مقیم و کارشناسان نخبه',
      description: 'همراهی مهندسان معمار و کارشناسانی با بیش از یک دهه سابقه انحصاری در معاملات پنت‌هاوس‌های مارک‌دار شمیرانات.',
      badge: 'تیم متخصص',
    },
    {
      icon: Lock,
      title: 'حفظ محرمانگی کامل (Private Listing)',
      description: 'امکان خرید و فروش پنت‌هاوس‌ها و عمارت‌ها در فضایی کاملاً خصوصی، بدون انتشار عمومی و صرفاً برای متقاضیان تاییدشده.',
      badge: 'امنیت و پرایوسی',
    },
    {
      icon: FileText,
      title: 'همراهی حقوقی تا تحویل کلید',
      description: 'تنظیم تخصصی مبایعه‌نامه رسمی، کارشناسی دادگستری در تهاترها، و نظارت بر انتقال امن ثمن معامله تا روز محضر.',
      badge: 'پشتیبانی کامل',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white border-b border-border/70">
      <Container>
        <HomeMotionWrapper>
          <SectionHeading
            badge="تمایز آرتام"
            title="چرا خریداران خاص، آرتام را برمی‌گزینند؟"
            subtitle="استانداردهای بین‌المللی کارگزاری املاک، تلفیق دانش حقوقی، تسلط بر معماری و تعهد اخلاقی به منافع مشتری"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((adv, idx) => {
              const Icon = adv.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-neutral-background border border-border/80 shadow-soft transition-all duration-300 hover:shadow-card hover:-translate-y-1 hover:border-accent/40"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <IconBox
                        icon={<Icon className="w-6 h-6 text-accent-700" />}
                        variant="softAccent"
                        size="lg"
                      />
                      <span className="text-[11px] font-bold text-accent-800 bg-accent-100/80 px-2.5 py-1 rounded-full border border-accent-200">
                        {adv.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-primary-900 leading-snug">
                      {adv.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-[1.85]">
                      {adv.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-border/60 flex items-center gap-1.5 text-xs font-semibold text-primary-900">
                    <CheckCircle2 className="w-4 h-4 text-accent-600" />
                    <span>استاندارد تایید شده آرتام</span>
                  </div>
                </div>
              );
            })}
          </div>
        </HomeMotionWrapper>
      </Container>
    </section>
  );
}
