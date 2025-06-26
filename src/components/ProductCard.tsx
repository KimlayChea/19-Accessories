import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { Product } from "@/utils/productData";
import { useInStock } from "../customs/hooks/product/useInStock";
import { useFavorites } from "../customs/hooks/favorite/useFavorites";
import { useAddFavorite } from "../customs/hooks/favorite/useAddFavorite";
import { useDeleteFavorite } from "../customs/hooks/favorite/useDeleteFavorite";
import SpinnerMini from "../components/ui/SpinnerMini";
import { formatCurrency } from "@/utils/helpers";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, title, price, image, discount } = product;
  const { inStock, isPending } = useInStock(id);
  const { favorites, isPending: isPendingFavorites } = useFavorites();

  const { isPending: isPendingAddFavorite, addFavorite } = useAddFavorite();
  const { isPending: isPendingDeleteFavorite, deleteFavorite } =
    useDeleteFavorite();

  const [isFavorite, setIsFavorite] = useState(false);
  const discountedPrice =
    discount > 0 ? price - (price * discount) / 100 : price;

  useEffect(() => {
    setIsFavorite(favorites?.some((favorite) => favorite.id === id));
  }, [favorites, id]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      deleteFavorite(id, {
        onSuccess: () => {
          setIsFavorite(false);
        },
      });
    } else {
      addFavorite(id, {
        onSuccess: () => {
          setIsFavorite(true);
        },
      });
    }
  };

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <Link to={`/products/${id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />

          {discount > 0 && (
            <Badge variant="destructive" className="absolute top-2 left-2">
              {discount}% OFF
            </Badge>
          )}

          <button
            className="absolute top-2 right-2 flex items-center justify-center p-1.5 w-9 h-9 bg-background/80 rounded-full hover:bg-background transition"
            onClick={handleFavoriteClick}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            disabled={
              isPendingFavorites ||
              isPendingAddFavorite ||
              isPendingDeleteFavorite
            }
          >
            {isPendingFavorites ||
            isPendingAddFavorite ||
            isPendingDeleteFavorite ? (
              <span className="flex items-center justify-center w-full h-full">
                <SpinnerMini size="1.25rem" />
              </span>
            ) : (
              <Heart
                className={`h-5 w-5 transition-colors ${
                  isFavorite ? "fill-red-500 text-red-500" : ""
                }`}
              />
            )}
          </button>
        </div>

        <CardContent className="p-4">
          <h3 className="font-medium line-clamp-1">{title}</h3>
          <div className="mt-1.5">
            {discount > 0 ? (
              <div className="flex items-center gap-1.5">
                <span className="font-semibold">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  {formatCurrency(price)}
                </span>
              </div>
            ) : (
              <span className="font-semibold">{formatCurrency(price)}</span>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            variant="secondary"
            size="sm"
            className="w-full"
            disabled={!inStock || isPending}
          >
            {isPending
              ? "Loading..."
              : inStock
              ? "View Details"
              : "Out of Stock"}
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProductCard;
