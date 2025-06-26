import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { Product } from "@/utils/productData";

interface ProductListProps {
  items: Product[];
  isLoading?: boolean;
  skeletonCount?: number;
}

const ProductList = ({
  items,
  isLoading = false,
  skeletonCount = 6,
}: ProductListProps) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          // Show skeleton cards when loading
          Array(skeletonCount)
            .fill(0)
            .map((_, index) => (
              <ProductCardSkeleton key={`skeleton-${index}`} />
            ))
        ) : // Show actual product cards when not loading
        items?.length > 0 ? (
          items.map((item) => <ProductCard key={item.id} product={item} />)
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16">
            <h2 className="text-2xl font-bold mb-2 text-gray-500">
              No products found
            </h2>
            <p className="text-gray-500">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
