import React, { useState, useEffect, useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { Building2, Award, Users, TrendingUp } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { toPersianDigits } from '@/lib/formatters';
import { HomeMotionWrapper } from './HomeMotionWrapper';

interface CounterProps {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

function AnimatedCounter({ end, duration = 1.8, decimals = 0, prefix = '', suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    if (shouldReduceMotion) {
      setCount(end);
      return;
    }

    let start = 0;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = start + (end - start) * easeProgress;

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration, shouldReduceMotion]);

  const displayValue = decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toString();

  return (
    <span ref={ref} className="font-sans font-black tracking-tight">
      {prefix}
      {toPersianDigits(displayValue)}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const stats = [
    {
      icon: Building2,
      end: 380,
      suffix: '+',
      label: 'فایل ملکی انحصاری',
      desc: 'پنت‌هاوس‌ها، برج‌باغ‌ها و ویلاها',
    },
    {
      icon: Award,
      end: 99.4,
      decimals: 1,
      suffix: '٪',
      label: 'شاخص رضایت مشتریان',
      desc: 'استعلام کتبی پس از ثبت و انتقال سند',
    },
    {
      icon: Users,
      end: 24,
      label: 'کارشناس و مشاور حقوقی',
      desc: 'مقیم در دفاتر زعفرانیه، فرشته و نیاوران',
    },
    {
      icon: TrendingUp,
      end: 15,
      suffix: ' سال',
      label: 'سابقه درخشان در شمیرانات',
      desc: 'پیشگام در ارزیابی و معاملات کلان ملکی',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-primary-950 via-[#0F2A47] to-primary-950 text-white relative overflow-hidden">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#C9A24B_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <Container className="relative z-10">
        <HomeMotionWrapper>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-white/10">
            {stats.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center p-4 pt-6 sm:pt-4 space-y-3"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xs text-accent-400 flex items-center justify-center border border-accent-400/30 shadow-inner mb-1">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="text-4xl sm:text-5xl font-black text-white">
                    <AnimatedCounter
                      end={item.end}
                      decimals={item.decimals}
                      suffix={item.suffix}
                    />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-accent-200">
                      {item.label}
                    </h3>
                    <p className="text-xs text-slate-300 font-normal max-w-[200px]">
                      {item.desc}
                    </p>
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
