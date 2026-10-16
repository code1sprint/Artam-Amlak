import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Button } from '@/components/ui/button';
import { BlogCard } from '@/components/common/BlogCard';
import { useBlogPosts } from '@/features/content/hooks';
import { ROUTES } from '@/constants/routes';
import { HomeMotionWrapper } from './HomeMotionWrapper';

export function LatestBlogSection() {
  const { data: blogPosts, isLoading } = useBlogPosts();

  return (
    <section className="py-20 md:py-28 bg-white border-b border-border/70">
      <Container>
        <HomeMotionWrapper>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <SectionHeading
              align="start"
              className="mb-0"
              badge="مجله تخصصی مسکن"
              title="تحلیل‌ها و بینش‌های بازار املاک فاخر"
              subtitle="جدیدترین مقالات معماری نئوکلاسیک، تحلیل‌های اقتصادی قیمت زمین و راهنماهای حقوقی شمیرانات"
            />
            <Button asChild variant="outline" size="md" className="self-start md:self-end shrink-0 shadow-xs">
              <Link to={ROUTES.BLOG}>
                ورود به مجله تخصصی
                <ArrowLeft className="w-4 h-4 me-2" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-80 rounded-2xl bg-muted/60 animate-pulse" />
                ))
              : blogPosts?.slice(0, 3).map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
          </div>

          <div className="text-center mt-10 md:hidden">
            <Button asChild variant="primary" className="w-full">
              <Link to={ROUTES.BLOG}>
                ورود به مجله تخصصی
                <ArrowLeft className="w-4 h-4 me-2" />
              </Link>
            </Button>
          </div>
        </HomeMotionWrapper>
      </Container>
    </section>
  );
}
