import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '@/constants/site';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';

export type BrandLogoVariant = 'mark' | 'full' | 'lockup';

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  /** Pixel height for the mark / full image */
  size?: number;
  className?: string;
  /** Wrap in a home link (default true for lockup) */
  asLink?: boolean;
  /** Show English subtitle under Persian name (lockup only) */
  showEnName?: boolean;
  /** Subtitle override under brand name (lockup only) */
  subtitle?: string;
}

export function BrandLogo({
  variant = 'lockup',
  size,
  className,
  asLink,
  showEnName = true,
  subtitle,
}: BrandLogoProps) {
  const shouldLink = asLink ?? variant === 'lockup';
  const markSize = size ?? (variant === 'full' ? 120 : 48);

  const mark = (
    <img
      src={SITE_CONFIG.brand.logoMark}
      alt=""
      width={markSize}
      height={Math.round(markSize * 0.806)}
      className={cn(
        'object-contain object-center rounded-xl shadow-soft shrink-0',
        variant === 'full' && 'rounded-2xl'
      )}
      style={{ width: markSize, height: 'auto' }}
      decoding="async"
    />
  );

  const full = (
    <img
      src={SITE_CONFIG.brand.logoFull}
      alt={SITE_CONFIG.brand.name}
      width={size ?? 140}
      height={Math.round((size ?? 140) * 1.58)}
      className="object-contain object-center rounded-2xl shadow-soft"
      style={{ width: size ?? 140, height: 'auto' }}
      decoding="async"
    />
  );

  let content: React.ReactNode;

  if (variant === 'mark') {
    content = (
      <span className={cn('inline-flex', className)} aria-label={SITE_CONFIG.brand.name}>
        {mark}
      </span>
    );
  } else if (variant === 'full') {
    content = <span className={cn('inline-flex', className)}>{full}</span>;
  } else {
    content = (
      <span className={cn('group flex items-center gap-3', className)}>
        {mark}
        <span className="flex flex-col text-start">
          <span className="text-base sm:text-lg font-black tracking-tight text-primary-900 leading-tight">
            {SITE_CONFIG.brand.name}
          </span>
          <span className="text-[9px] sm:text-[10px] font-semibold text-accent-700 tracking-widest font-sans">
            {subtitle ?? (showEnName ? SITE_CONFIG.brand.enName : null)}
          </span>
        </span>
      </span>
    );
  }

  if (!shouldLink) {
    return content;
  }

  return (
    <Link
      to={ROUTES.HOME}
      className="inline-flex transition-transform duration-200 active:scale-98 hover:opacity-95"
      aria-label={SITE_CONFIG.brand.name}
    >
      {content}
    </Link>
  );
}
