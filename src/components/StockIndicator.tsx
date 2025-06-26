
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Package } from 'lucide-react';

interface StockIndicatorProps {
  stock: number;
  inStock: boolean;
}

const StockIndicator: React.FC<StockIndicatorProps> = ({ stock, inStock }) => {
  const getStockVariant = () => {
    if (!inStock || stock === 0) return 'destructive';
    if (stock <= 5) return 'outline';
    return 'secondary';
  };

  const getStockText = () => {
    if (!inStock || stock === 0) return 'Out of Stock';
    if (stock <= 5) return `Only ${stock} left`;
    return `${stock} in stock`;
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <Package className="h-4 w-4 text-muted-foreground" />
      <Badge variant={getStockVariant()}>
        {getStockText()}
      </Badge>
    </div>
  );
};

export default StockIndicator;
