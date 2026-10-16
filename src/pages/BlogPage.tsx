import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

import { Container } from '@/components/common/Container';
import { BlogCard } from '@/components/common/BlogCard';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useBlogPosts } from '@/features/content/hooks';
import { ROUTES } from '@/constants/routes';
import { SITE_CONFIG } from '@/constants/site';
import { toPersianDigits } from '@/lib/formatters';
import { cn } from '@/lib/utils';

export default function BlogPage() {
  const { data: posts, isLoading, isError } = useBlogPosts();
  const [category, setCategory] = useState<string>('all');
  const [query, setQuery] = useState('');

  const categories = useMemo(() => {
    if (!posts) return [];
    return Array.from(new Set(posts.map((p) => p.category)));
  }, [posts]);

  const filtered = useMemo(() => {
    if (!posts) return [];
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchCategory = category === 'all' || post.category === category;
      const matchQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));
      return matchCategory && matchQuery;
    });
  }, [posts, category, query]);

  return (
    <>
      <Helmet>
        <title>{`مجله تخصصی | ${SITE_CONFIG.brand.name}`}</title>
        <meta
          name="description"
          content="تحلیل بازار مسکن لوکس، معماری، حقوق املاک و راهنمای سرمایه‌گذاری در شمیرانات."
        />
      </Helmet>

      <div className="py-8 bg-neutral-background min-h-screen">
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
                <BreadcrumbPage>مجله تخصصی</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="pb-8 border-b border-border mb-8 max-w-3xl">
            <h1 className="text-2xl sm:text-4xl font-black text-primary-900 tracking-tight">
              مجله تخصصی آرتام
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed">
              تحلیل‌های بازار، معماری لوکس، نکات حقوقی و راهنمای سرمایه‌گذاری در املاک شمیرانات.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute top-1/2 start-3 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="جستجو در مقالات..."
                className="ps-10 h-11 rounded-xl"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCategory('all')}
                className={cn(
                  'px-3.5 py-2 rounded-xl text-xs font-bold transition-colors border',
                  category === 'all'
                    ? 'bg-primary-900 text-white border-primary-900'
                    : 'bg-white text-foreground border-border hover:border-accent/50'
                )}
              >
                همه
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={cn(
                    'px-3.5 py-2 rounded-xl text-xs font-bold transition-colors border',
                    category === cat
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-border bg-white overflow-hidden">
                  <Skeleton className="aspect-[16/9] w-full rounded-none" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {isError && (
            <p className="text-sm text-rose-600 text-center py-16">خطا در بارگذاری مقالات. لطفاً دوباره تلاش کنید.</p>
          )}

          {!isLoading && !isError && filtered.length === 0 && (
            <div className="text-center py-20 space-y-2">
              <p className="text-base font-bold text-primary-900">مقاله‌ای یافت نشد</p>
              <p className="text-sm text-muted-foreground">دسته یا عبارت جستجو را تغییر دهید.</p>
            </div>
          )}

          {!isLoading && filtered.length > 0 && (
            <>
              <p className="text-xs text-muted-foreground mb-4">
                {toPersianDigits(filtered.length)} مقاله
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </>
          )}
        </Container>
      </div>
    </>
  );
}
