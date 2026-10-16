import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, Link2, List, Share2 } from 'lucide-react';
import { toast } from 'sonner';

import { Container } from '@/components/common/Container';
import { BlogCard } from '@/components/common/BlogCard';
import { PersonAvatar } from '@/components/common/PersonAvatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useBlogPost, useBlogPosts } from '@/features/content/hooks';
import { ROUTES } from '@/constants/routes';
import { SITE_CONFIG } from '@/constants/site';
import { toPersianDigits } from '@/lib/formatters';

/** lucide may not export Telegram in all versions — use MessageCircle fallback via share URLs */
function ShareIconTelegram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06-.01.24 0 .38z" />
    </svg>
  );
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, isError } = useBlogPost(slug);
  const { data: allPosts } = useBlogPosts();

  const paragraphs = useMemo(() => {
    if (!post?.content) return [];
    return post.content
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);
  }, [post]);

  const toc = useMemo(
    () =>
      paragraphs.map((p, i) => ({
        id: `section-${i + 1}`,
        label: p.length > 48 ? `${p.slice(0, 48)}…` : p,
      })),
    [paragraphs]
  );

  const related = useMemo(() => {
    if (!post || !allPosts) return [];
    return allPosts
      .filter((p) => p.id !== post.id && (p.category === post.category || p.tags.some((t) => post.tags.includes(t))))
      .slice(0, 3);
  }, [post, allPosts]);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `${SITE_CONFIG.brand.name}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('لینک مقاله کپی شد');
    } catch {
      toast.error('کپی لینک ممکن نشد');
    }
  };

  const shareNative = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({ title: post.title, text: post.excerpt, url: window.location.href });
      } catch {
        /* user cancelled */
      }
    } else {
      copyLink();
    }
  };

  if (isLoading) {
    return (
      <div className="py-8 bg-neutral-background min-h-screen">
        <Container size="lg">
          <Skeleton className="h-4 w-48 mb-6" />
          <Skeleton className="aspect-[21/9] w-full rounded-3xl mb-8" />
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6" />
        </Container>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <>
        <Helmet>
          <title>{`مقاله یافت نشد | ${SITE_CONFIG.brand.name}`}</title>
        </Helmet>
        <div className="py-24 text-center bg-neutral-background min-h-[60vh]">
          <Container>
            <h1 className="text-2xl font-bold text-primary-900 mb-3">مقاله مورد نظر یافت نشد</h1>
            <p className="text-sm text-muted-foreground mb-6">ممکن است آدرس تغییر کرده باشد.</p>
            <Button asChild variant="primary">
              <Link to={ROUTES.BLOG}>بازگشت به مجله</Link>
            </Button>
          </Container>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${post.title} | ${SITE_CONFIG.brand.name}`}</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.coverImage} />
      </Helmet>

      <article className="py-8 bg-neutral-background min-h-screen">
        <Container size="lg">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={ROUTES.HOME}>صفحه اصلی</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={ROUTES.BLOG}>مجله تخصصی</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1 max-w-[200px] sm:max-w-xs">
                  {post.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="relative aspect-[21/9] min-h-[220px] rounded-3xl overflow-hidden mb-8 border border-border shadow-card">
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <div className="absolute bottom-4 start-4 end-4 sm:bottom-6 sm:start-6">
              <Badge variant="primary" className="mb-2 shadow-xs">
                {post.category}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-8">
              <header className="space-y-4">
                <h1 className="text-2xl sm:text-4xl font-black text-primary-900 tracking-tight leading-[1.35]">
                  {post.title}
                </h1>
                <p className="text-base text-muted-foreground leading-relaxed">{post.excerpt}</p>

                <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-border/70">
                  <div className="flex items-center gap-2.5">
                    <PersonAvatar
                      name={post.author.name}
                      src={post.author.avatar}
                      className="w-10 h-10 rounded-full border border-border text-sm"
                      imgClassName="w-10 h-10 rounded-full object-cover border border-border"
                      loading="eager"
                    />
                    <div>
                      <p className="text-sm font-bold text-primary-900">{post.author.name}</p>
                      <p className="text-[11px] text-muted-foreground">{post.author.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5 text-accent-600" />
                    {toPersianDigits(post.createdAt)}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5 text-accent-600" />
                    {toPersianDigits(post.readingTime)} دقیقه مطالعه
                  </div>
                </div>
              </header>

              <div className="prose-article space-y-5 text-[15px] sm:text-base leading-[1.9] text-foreground/90">
                {paragraphs.map((paragraph, i) => (
                  <p key={toc[i].id} id={toc[i].id} className="scroll-mt-28">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg bg-muted text-xs font-medium text-muted-foreground border border-border/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="rounded-2xl border border-border bg-white p-5 flex flex-wrap items-center gap-3">
                <span className="text-sm font-bold text-primary-900 flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-accent-600" />
                  اشتراک‌گذاری
                </span>
                <Button type="button" variant="outline" size="sm" onClick={shareNative}>
                  اشتراک
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={copyLink}>
                  <Link2 className="w-3.5 h-3.5 ms-1" />
                  کپی لینک
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : shareUrl)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ShareIconTelegram className="w-3.5 h-3.5 ms-1" />
                    تلگرام
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`${post.title} — ${typeof window !== 'undefined' ? window.location.href : ''}`)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    واتساپ
                  </a>
                </Button>
              </div>
            </div>

            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28 lg:self-start">
              {toc.length > 1 && (
                <nav className="rounded-2xl border border-border bg-white p-5 shadow-soft">
                  <h2 className="text-sm font-bold text-primary-900 flex items-center gap-2 mb-3">
                    <List className="w-4 h-4 text-accent-600" />
                    فهرست مطالب
                  </h2>
                  <ol className="space-y-2">
                    {toc.map((item, i) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="text-xs text-muted-foreground hover:text-accent-700 leading-relaxed block transition-colors"
                        >
                          <span className="font-sans text-accent-600 me-1">{toPersianDigits(i + 1)}.</span>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              <div className="rounded-2xl border border-border bg-[#0B2139] text-white p-5 space-y-3">
                <p className="text-sm font-bold">ثبت رایگان ملک در آرتام</p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  ملک لوکس خود را به کارشناسان ما بسپارید.
                </p>
                <Button asChild variant="outline" size="sm" className="bg-accent text-primary-950 border-transparent hover:bg-accent-400">
                  <Link to={ROUTES.SUBMIT_PROPERTY}>شروع ثبت ملک</Link>
                </Button>
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <section className="mt-16 pt-10 border-t border-border">
              <h2 className="text-xl font-bold text-primary-900 mb-6">مقالات مرتبط</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((item) => (
                  <BlogCard key={item.id} post={item} />
                ))}
              </div>
            </section>
          )}
        </Container>
      </article>
    </>
  );
}
