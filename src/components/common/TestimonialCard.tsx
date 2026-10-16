import React from 'react';
import { Quote, Star, Building2, CheckCircle2 } from 'lucide-react';
import { Testimonial } from '@/types/schema';
import { toPersianDigits } from '@/lib/formatters';

export interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({ testimonial, className = '' }: TestimonialCardProps) {
  return (
    <article
      className={`flex flex-col justify-between rounded-2xl bg-white border border-border p-6 shadow-soft transition-all duration-300 hover:shadow-card hover:-translate-y-1 relative ${className}`}
    >
      <div className="space-y-4">
        {/* Rating and Quote Icon */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1" dir="ltr">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`w-4 h-4 ${
                  index < Math.round(testimonial.rating)
                    ? 'fill-accent-500 text-accent-500'
                    : 'text-border'
                }`}
              />
            ))}
          </div>
          <Quote className="w-6 h-6 text-accent-300/60 rotate-180" />
        </div>

        {/* Comment Text */}
        <p className="text-sm text-foreground/90 leading-[1.85] italic">
          «{testimonial.comment}»
        </p>

        {/* Property verified purchase badge */}
        {testimonial.propertyTitle && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary-50/80 text-[11px] font-semibold text-primary-900 border border-primary-100">
            <Building2 className="w-3.5 h-3.5 text-accent-600 shrink-0" />
            <span className="truncate">{testimonial.propertyTitle}</span>
          </div>
        )}
      </div>

      {/* Author Details Footer */}
      <div className="pt-5 mt-5 border-t border-border/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl overflow-hidden border border-border shrink-0 shadow-xs">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="text-sm font-bold text-primary-900 flex items-center gap-1">
              <span>{testimonial.name}</span>
              <span title="تایید هویت شده">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent-600" />
              </span>
            </h4>
            <span className="text-xs text-muted-foreground block">{testimonial.role}</span>
          </div>
        </div>

        <span className="text-[11px] text-muted-foreground font-sans">
          {toPersianDigits(testimonial.date)}
        </span>
      </div>
    </article>
  );
}
