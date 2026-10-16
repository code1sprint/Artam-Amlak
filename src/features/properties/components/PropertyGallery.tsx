import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Camera,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toPersianDigits } from '@/lib/formatters';

export interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Mobile Embla Carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({
    direction: 'rtl',
    loop: true,
  });

  const [mobileSlideIndex, setMobileSlideIndex] = useState(0);

  const onMobileSelect = useCallback(() => {
    if (!emblaApi) return;
    setMobileSlideIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onMobileSelect);
  }, [emblaApi, onMobileSelect]);

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextPhoto = useCallback(() => {
    setActivePhotoIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevPhoto = useCallback(() => {
    setActivePhotoIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') nextPhoto();
      if (e.key === 'ArrowRight') prevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, nextPhoto, prevPhoto]);

  // Touch swipe support for Lightbox
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    // Swipe threshold
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swiped left (in RTL, forward)
        nextPhoto();
      } else {
        // Swiped right (in RTL, backward)
        prevPhoto();
      }
    }
    setTouchStart(null);
  };

  // Safe fallback if images array is short
  const mainImage = images[0];
  const sideImages = images.slice(1, 5);
  const remainingCount = images.length - 5;

  return (
    <>
      {/* 1. DESKTOP GALLERY GRID (Hidden on Mobile) */}
      <div className="hidden md:grid grid-cols-4 gap-3 h-[460px] rounded-3xl overflow-hidden shadow-card border border-border bg-muted">
        {/* Main Large Image (2 cols) */}
        <div
          onClick={() => openLightbox(0)}
          className="col-span-2 relative h-full cursor-pointer group overflow-hidden"
        >
          <img
            src={mainImage}
            alt={`${title} - عکس اصلی`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          <div className="absolute bottom-4 start-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs font-semibold shadow-soft">
            <Maximize2 className="w-3.5 h-3.5 text-accent" />
            <span>مشاهده گالری تمام‌صفحه</span>
          </div>
        </div>

        {/* 4 Smaller Images Grid (2 cols) */}
        <div className="col-span-2 grid grid-cols-2 gap-3 h-full">
          {sideImages.map((img, idx) => {
            const actualIndex = idx + 1;
            const isLast = idx === 3 && remainingCount > 0;

            return (
              <div
                key={actualIndex}
                onClick={() => openLightbox(actualIndex)}
                className="relative h-[224px] cursor-pointer group overflow-hidden bg-muted rounded-xl"
              >
                <img
                  src={img}
                  alt={`${title} - عکس ${toPersianDigits(actualIndex + 1)}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />

                {isLast && (
                  <div className="absolute inset-0 bg-primary-950/75 backdrop-blur-xs flex flex-col items-center justify-center text-white p-2 text-center group-hover:bg-primary-950/85 transition-colors">
                    <Layers className="w-6 h-6 text-accent mb-1" />
                    <span className="text-sm font-bold">
                      +{toPersianDigits(remainingCount)} تصویر دیگر
                    </span>
                    <span className="text-[10px] text-slate-300">کلیک برای مشاهده</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. MOBILE SWIPEABLE CAROUSEL (Visible on Mobile) */}
      <div className="md:hidden relative rounded-2xl overflow-hidden aspect-[4/3] bg-muted shadow-soft border border-border">
        <div className="overflow-hidden h-full" ref={emblaRef}>
          <div className="flex h-full -ms-0">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="flex-[0_0_100%] min-w-0 h-full relative cursor-pointer"
                onClick={() => openLightbox(idx)}
              >
                <img
                  src={img}
                  alt={`${title} - عکس ${toPersianDigits(idx + 1)}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Photo Counter Badge */}
        <div className="absolute bottom-3 end-3 px-3 py-1 rounded-xl bg-primary-950/75 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 shadow-soft font-sans">
          <Camera className="w-3.5 h-3.5 text-accent" />
          <span>
            {toPersianDigits(mobileSlideIndex + 1)} از {toPersianDigits(images.length)}
          </span>
        </div>

        {/* Expand button */}
        <button
          type="button"
          onClick={() => openLightbox(mobileSlideIndex)}
          className="absolute top-3 end-3 p-2 rounded-xl bg-black/50 backdrop-blur-md text-white"
          aria-label="بزرگنمایی تصویر"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* 3. FULLSCREEN LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="گالری تصاویر تمام‌صفحه"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg select-none"
        >
          {/* Top Bar with Counter and Close Button */}
          <div className="absolute top-0 inset-x-0 p-4 sm:p-6 flex items-center justify-between text-white z-20 bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base font-sans text-accent-400">
                تصویر {toPersianDigits(activePhotoIndex + 1)} از {toPersianDigits(images.length)}
              </span>
              <span className="text-xs text-slate-300 hidden sm:inline truncate max-w-md">
                - {title}
              </span>
            </div>

            <button
              type="button"
              onClick={closeLightbox}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="بستن گالری"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Previous Button (Right Arrow in RTL) */}
          <button
            type="button"
            onClick={prevPhoto}
            className="absolute end-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-2xl bg-white/10 hover:bg-accent hover:text-primary-950 text-white transition-all cursor-pointer shadow-soft hidden sm:flex items-center justify-center"
            aria-label="تصویر قبلی"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Next Button (Left Arrow in RTL) */}
          <button
            type="button"
            onClick={nextPhoto}
            className="absolute start-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-2xl bg-white/10 hover:bg-accent hover:text-primary-950 text-white transition-all cursor-pointer shadow-soft hidden sm:flex items-center justify-center"
            aria-label="تصویر بعدی"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Main Displayed Image */}
          <div className="relative max-w-6xl max-h-[85vh] w-full p-4 flex items-center justify-center">
            <img
              src={images[activePhotoIndex]}
              alt={`${title} - ${toPersianDigits(activePhotoIndex + 1)}`}
              className="max-h-[80vh] max-w-full object-contain rounded-2xl shadow-2xl transition-all duration-300"
            />
          </div>

          {/* Bottom Thumbnails Navigation Strip */}
          <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-2 px-4 overflow-x-auto py-2 z-20">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActivePhotoIndex(idx)}
                className={`w-14 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                  idx === activePhotoIndex
                    ? 'border-accent scale-105 shadow-md'
                    : 'border-white/20 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="پیش‌نمایش" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
