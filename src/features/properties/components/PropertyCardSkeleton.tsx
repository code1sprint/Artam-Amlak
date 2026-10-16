import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function PropertyCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl bg-white border border-border/80 shadow-soft overflow-hidden">
      {/* 4:3 Aspect Ratio Image Skeleton */}
      <Skeleton className="aspect-[4/3] w-full" />

      {/* Content Skeleton */}
      <div className="flex flex-col p-5 space-y-4">
        {/* Title */}
        <Skeleton className="h-5 w-4/5 rounded-md" />

        {/* Specs bar */}
        <Skeleton className="h-10 w-full rounded-xl" />

        {/* Price & action */}
        <div className="pt-2 flex items-center justify-between border-t border-border/60">
          <Skeleton className="h-6 w-28 rounded-md" />
          <Skeleton className="h-4 w-20 rounded-md" />
        </div>
      </div>
    </div>
  );
}
