import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_CONFIG } from '@/constants/site';

import { HomeHero } from '@/components/home/HomeHero';
import { FeaturedPropertiesSection } from '@/components/home/FeaturedPropertiesSection';
import { PropertyCategoriesSection } from '@/components/home/PropertyCategoriesSection';
import { WhyUsSection } from '@/components/home/WhyUsSection';
import { StatsSection } from '@/components/home/StatsSection';
import { TopAgentsSection } from '@/components/home/TopAgentsSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { SubmitPropertyCtaSection } from '@/components/home/SubmitPropertyCtaSection';
import { LatestBlogSection } from '@/components/home/LatestBlogSection';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>{`${SITE_CONFIG.brand.name} | ${SITE_CONFIG.brand.tagline}`}</title>
        <meta name="description" content={SITE_CONFIG.brand.description} />
      </Helmet>

      {/* 1. Full-width Hero with Overlapping QuickSearchBar */}
      <HomeHero />

      {/* 2. Featured Properties Section */}
      <FeaturedPropertiesSection />

      {/* 3. Visual Categories Section */}
      <PropertyCategoriesSection />

      {/* 4. Why Us / Key Advantages */}
      <WhyUsSection />

      {/* 5. Animated Viewport Counters Stats */}
      <StatsSection />

      {/* 6. Top Agents Section */}
      <TopAgentsSection />

      {/* 7. Client Testimonials Embla RTL Carousel */}
      <TestimonialsSection />

      {/* 8. Submit Property CTA Banner */}
      <SubmitPropertyCtaSection />

      {/* 9. Latest Blog Posts */}
      <LatestBlogSection />
    </>
  );
}
