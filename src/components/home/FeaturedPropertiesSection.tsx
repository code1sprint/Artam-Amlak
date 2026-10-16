import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Button } from '@/components/ui/button';
import { PropertyGrid } from '@/features/properties/components/PropertyGrid';
import { useFeaturedProperties } from '@/features/properties/hooks';
import { HomeMotionWrapper } from './HomeMotionWrapper';
import { ROUTES } from '@/constants/routes';

export function FeaturedPropertiesSection() {
  const { data: featuredProperties, isLoading } = useFeaturedProperties(6);

  return (
    <section className="pt-32 pb-20 md:pt-36 md:pb-28 bg-white border-b border-border/70">
      <Container>
        <HomeMotionWrapper>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <SectionHeading
              align="start"
              className="mb-0"
              badge="منتخب کارشناسان"
              title="فایل‌های ویژه و انحصاری"
              subtitle="گلچینی از نایاب‌ترین پنت‌هاوس‌ها، ویلاها و عمارت‌های تاییدشده در مناطق یک و دو تهران"
            />
            <Button asChild variant="outline" size="md" className="self-start md:self-end shrink-0 shadow-xs">
              <Link to={`${ROUTES.PROPERTIES}?isFeatured=true`}>
                مشاهده همه فایل‌های ویژه
                <ArrowLeft className="w-4 h-4 me-2" />
              </Link>
            </Button>
          </div>

          <PropertyGrid
            properties={featuredProperties}
            isLoading={isLoading}
            skeletonCount={6}
          />

          <div className="text-center mt-12 md:hidden">
            <Button asChild variant="primary" className="w-full">
              <Link to={`${ROUTES.PROPERTIES}?isFeatured=true`}>
                مشاهده همه فایل‌های ویژه
                <ArrowLeft className="w-4 h-4 me-2" />
              </Link>
            </Button>
          </div>
        </HomeMotionWrapper>
      </Container>
    </section>
  );
}
