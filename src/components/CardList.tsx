
import React from 'react';
import Card, { CardData } from './Card';
import CardSkeleton from './CardSkeleton';

interface CardListProps {
  items: CardData[];
  title?: string;
  isLoading?: boolean;
  skeletonCount?: number;
}

const CardList = ({ 
  items, 
  title, 
  isLoading = false, 
  skeletonCount = 6 
}: CardListProps) => {
  return (
    <div className="w-full max-w-7xl mx-auto">
      {title && (
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Show skeleton cards when loading
          Array(skeletonCount).fill(0).map((_, index) => (
            <CardSkeleton key={`skeleton-${index}`} />
          ))
        ) : (
          // Show actual cards when not loading
          items.map((item) => (
            <Card key={item.id} data={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default CardList;
