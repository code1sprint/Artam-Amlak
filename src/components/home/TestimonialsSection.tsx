import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronRight, ChevronLeft, Quote, Star } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Button } from '@/components/ui/button';
import { TestimonialCard } from '@/components/common/TestimonialCard';
import { useTestimonials } from '@/features/content/hooks';
import { HomeMotionWrapper } from './HomeMotionWrapper';

export function TestimonialsSection() {
  const { data: testimonials } = useTestimonials();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    direction: 'rtl',
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-20 md:py-28 bg-neutral-background border-b border-border/70 overflow-hidden">
      <Container>
        <HomeMotionWrapper>
          {/* Header with Navigation Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <SectionHeading
              align="start"
              className="mb-0"
              badge="اعتماد سرمایه‌گذاران"
              title="تجربه مالکان و خریداران فاخر"
              subtitle="دیدگاه مدیران عامل، پزشکان و دیپلمات‌هایی که معاملات خود را به کارگزاری آرتام سپردند"
            />

            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-2 self-start sm:self-end">
              <Button
                variant="outline"
                size="icon"
                onClick={scrollPrev}
                aria-label="اسلاید قبلی"
                className="rounded-xl border-border bg-white text-primary-900 hover:bg-primary-50 shadow-xs"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={scrollNext}
                aria-label="اسلاید بعدی"
                className="rounded-xl border-border bg-white text-primary-900 hover:bg-primary-50 shadow-xs"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Embla Carousel Viewport */}
          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex -ms-6">
              {testimonials?.map((item) => (
                <div
                  key={item.id}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] ps-6"
                >
                  <TestimonialCard testimonial={item} className="h-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                aria-label={`رفتن به اسلاید ${index + 1}`}
                className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                  index === selectedIndex
                    ? 'w-8 bg-accent-500'
                    : 'w-2 bg-border hover:bg-muted-foreground/40'
                }`}
              />
            ))}
          </div>
        </HomeMotionWrapper>
      </Container>
    </section>
  );
}
