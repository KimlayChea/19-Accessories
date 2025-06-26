import ProductList from "@/components/ProductList";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useFavorites } from "../customs/hooks/favorite/useFavorites";

const Favorites = () => {
  const { isPending, favorites } = useFavorites();

  const showEmpty = !isPending && (!favorites || favorites.length === 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Favorites</h1>

      {showEmpty ? (
        <div className="text-center py-16">
          <Heart className="mx-auto h-16 w-16 text-muted stroke-1 mb-4" />
          <h2 className="text-xl font-medium mb-2">
            Your favorites list is empty
          </h2>
          <p className="text-muted-foreground mb-6">
            Add items to your favorites to see them here
          </p>
          <Button asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          <ProductList items={favorites} isLoading={false} />
        </div>
      )}
    </div>
  );
};

export default Favorites;
