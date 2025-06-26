import React from "react";
import { cn } from "@/lib/utils";

export interface CardData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags?: string[];
}

interface CardProps {
  data: CardData;
  className?: string;
}

const Card = ({ data, className }: CardProps) => {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        className
      )}
    >
      <div className="aspect-video w-full overflow-hidden bg-gray-100">
        <img
          src={data.imageUrl}
          alt={data.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 line-clamp-1">
          {data.title}
        </h3>
        <p className="text-gray-600 mb-3 line-clamp-2">{data.description}</p>
        {data.tags && (
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
