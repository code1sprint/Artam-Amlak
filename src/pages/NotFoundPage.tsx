import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Building2, Home, HelpCircle, ArrowLeft } from 'lucide-react';

import { Container } from '@/components/common/Container';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { SITE_CONFIG } from '@/constants/site';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>{`صفحه یافت نشد | ${SITE_CONFIG.brand.name}`}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="py-20 sm:py-28 bg-neutral-background min-h-[70vh] flex items-center">
        <Container>
          <div className="max-w-lg mx-auto text-center space-y-6">
            <div className="relative inline-block">
              <span className="text-8xl sm:text-9xl font-black text-accent/20 select-none">۴۰۴</span>
              <span className="absolute inset-0 flex items-center justify-center text-5xl sm:text-6xl font-black text-accent">
                ۴۰۴
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary-900">صفحه مورد نظر پیدا نشد</h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              ممکن است آدرس تغییر کرده باشد، لینک منقضی شده باشد، یا صفحه موقتاً در دسترس نباشد.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button asChild variant="primary" size="lg">
                <Link to={ROUTES.HOME}>
                  <Home className="w-4 h-4 ms-2" />
                  بازگشت به صفحه اصلی
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to={ROUTES.PROPERTIES}>
                  <Building2 className="w-4 h-4 ms-2" />
                  مشاهده لیست فایل‌ها
                </Link>
              </Button>
            </div>
            <div className="pt-6 flex flex-wrap items-center justify-center gap-4 text-xs">
              <Link
                to={ROUTES.FAQ}
                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-accent-700 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                پرسش‌های متداول
              </Link>
              <span className="text-border">|</span>
              <Link
                to={ROUTES.CONTACT}
                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-accent-700 transition-colors"
              >
                تماس با ما
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
