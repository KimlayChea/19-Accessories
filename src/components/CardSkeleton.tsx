
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const CardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
      {/* Image skeleton */}
      <Skeleton className="aspect-video w-full h-48" />
      <div className="p-4">
        {/* Title skeleton */}
        <Skeleton className="h-6 w-3/4 mb-2" />
        {/* Description skeleton */}
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-4/5 mb-3" />
        {/* Tags skeleton */}
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
