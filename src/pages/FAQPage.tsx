import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { HelpCircle, Search } from 'lucide-react';

import { Container } from '@/components/common/Container';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useFAQs } from '@/features/content/hooks';
import { ROUTES } from '@/constants/routes';
import { SITE_CONFIG } from '@/constants/site';
import { toPersianDigits } from '@/lib/formatters';
import { cn } from '@/lib/utils';

export default function FAQPage() {
  const { data: faqs, isLoading, isError } = useFAQs();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = useMemo(() => {
    if (!faqs) return [];
    return Array.from(new Set(faqs.map((f) => f.category)));
  }, [faqs]);

  const filtered = useMemo(() => {
    if (!faqs) return [];
    const q = query.trim().toLowerCase();
    return faqs.filter((item) => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const matchQ =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [faqs, query, activeCategory]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    filtered.forEach((item) => {
      const list = map.get(item.category) ?? [];
      list.push(item);
      map.set(item.category, list);
    });
    return Array.from(map.entries());
  }, [filtered]);

  const jsonLd = useMemo(() => {
    if (!faqs?.length) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };
  }, [faqs]);

  return (
    <>
      <Helmet>
        <title>{`پرسش‌های متداول | ${SITE_CONFIG.brand.name}`}</title>
        <meta
          name="description"
          content="پاسخ به سوالات رایج درباره معاملات ملکی، کمیسیون، اسناد، بازدید و خدمات بین‌الملل آرتام."
        />
        {jsonLd && (
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        )}
      </Helmet>

      <div className="py-8 bg-neutral-background min-h-screen">
        <Container size="md">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={ROUTES.HOME}>صفحه اصلی</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>پرسش‌های متداول</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="pb-8 border-b border-border mb-8 max-w-2xl">
            <div className="flex items-center gap-2 text-accent-700 text-xs font-bold mb-2">
              <HelpCircle className="w-4 h-4" />
              راهنمای مشتریان
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-primary-900 tracking-tight">
              پرسش‌های متداول
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed">
              پاسخ شفاف به متداول‌ترین سوالات پیرامون معاملات، قراردادها، کمیسیون و خدمات آرتام.
            </p>
          </div>

          <div className="flex flex-col gap-4 mb-8">
            <div className="relative">
              <Search className="absolute top-1/2 start-3 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="جستجو در سوالات..."
                className="ps-10 h-11 rounded-xl bg-white"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={cn(
                  'px-3.5 py-2 rounded-xl text-xs font-bold transition-colors border',
                  activeCategory === 'all'
                    ? 'bg-primary-900 text-white border-primary-900'
                    : 'bg-white text-foreground border-border hover:border-accent/50'
                )}
              >
                همه دسته‌ها
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    'px-3.5 py-2 rounded-xl text-xs font-bold transition-colors border',
                    activeCategory === cat
                      ? 'bg-primary-900 text-white border-primary-900'
                      : 'bg-white text-foreground border-border hover:border-accent/50'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {isLoading && (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full rounded-xl" />
              ))}
            </div>
          )}

          {isError && (
            <p className="text-sm text-rose-600 text-center py-12">خطا در بارگذاری سوالات.</p>
          )}

          {!isLoading && !isError && filtered.length === 0 && (
            <div className="text-center py-16 space-y-2 rounded-2xl border border-border bg-white">
              <p className="font-bold text-primary-900">نتیجه‌ای یافت نشد</p>
              <p className="text-sm text-muted-foreground">عبارت جستجو یا دسته را تغییر دهید.</p>
            </div>
          )}

          {!isLoading && grouped.length > 0 && (
            <div className="space-y-8">
              <p className="text-xs text-muted-foreground">
                {toPersianDigits(filtered.length)} پرسش
              </p>
              {grouped.map(([category, items]) => (
                <section key={category} className="rounded-2xl border border-border bg-white p-5 sm:p-6 shadow-soft">
                  <h2 className="text-base font-bold text-primary-900 mb-3 pb-3 border-b border-border/70">
                    {category}
                  </h2>
                  <Accordion type="single" collapsible className="w-full">
                    {items.map((item) => (
                      <AccordionItem key={item.id} value={item.id}>
                        <AccordionTrigger className="text-sm">{item.question}</AccordionTrigger>
                        <AccordionContent>{item.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              ))}
            </div>
          )}

          <div className="mt-12 rounded-2xl border border-border bg-white p-6 text-center space-y-3">
            <p className="text-sm font-bold text-primary-900">پاسخ سوال خود را نیافتید؟</p>
            <p className="text-xs text-muted-foreground">با کارشناسان ما در تماس باشید.</p>
            <Link
              to={ROUTES.CONTACT}
              className="inline-flex text-sm font-bold text-accent-700 hover:text-accent-800"
            >
              صفحه تماس با ما ←
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
}
