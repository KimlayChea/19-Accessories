import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Heart, ShoppingCart, Minus, Plus, ChevronLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import ProductList from "@/components/ProductList";
import StockIndicator from "@/components/StockIndicator";
import ProductReviews from "@/components/ProductReviews";

import { toast } from "sonner";
import { useToast } from "../components/ui/use-toast";
import {
  isItemInCart,
  addItemToCart,
  removeItemFromCart,
} from "@/utils/cartUtils";
import { useAuthUser } from "@/customs/hooks/authentication/useAuthUser";
import { useProduct } from "../customs/hooks/product/useProduct";
import { useProductsRelated } from "../customs/hooks/product/useProductsRelated";

import { useFavorites } from "../customs/hooks/favorite/useFavorites";
import { useAddFavorite } from "../customs/hooks/favorite/useAddFavorite";
import { useDeleteFavorite } from "../customs/hooks/favorite/useDeleteFavorite";
import { useSetting } from "../customs/hooks/setting/useSetting";
import SoldIndicator from "@/components/ui/SoldIndicator";

const ProductDetails = () => {
  const { isAuthenticated } = useAuthUser();
  const { isPending, product } = useProduct();
  const { isPending: isPendingProductsRelated, productsRelated } =
    useProductsRelated();

  const { favorites, isPending: isPendingFavorites } = useFavorites();
  const { isPending: isPendingAddFavorite, addFavorite } = useAddFavorite();
  const { isPending: isPendingDeleteFavorite, deleteFavorite } =
    useDeleteFavorite();
  const { setting, isPendingSetting } = useSetting();

  const [isFavorite, setIsFavorite] = useState(false);

  const { toast: customToast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

  // const { favorites, addToFavorites, removeFromFavorites } = useUser();

  // const [product, setProduct] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  const [itemInCart, setItemInCart] = useState(false);

  useEffect(() => {
    if (isPendingFavorites || isPending) return;
    setIsFavorite(favorites?.some((favorite) => favorite.id === product?.id));
  }, [favorites, product?.id, isPendingFavorites, isPending]);

  // Check if item is in cart whenever product ID or selected size changes
  useEffect(() => {
    if (id) {
      setItemInCart(isItemInCart(id, selectedSize));
    }
  }, [id, selectedSize]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleToggleFavorite = () => {
    if (!isAuthenticated) return navigate("/login");

    if (!id) return;

    if (isFavorite) {
      deleteFavorite(id);
      toast.success("Removed from favorites");
    } else {
      addFavorite(id);
      toast.success("Added to favorites");
    }
  };

  useEffect(() => {
    if (
      product &&
      product.products_stock &&
      product.products_stock.length > 0
    ) {
      const noneStock = product.products_stock.find(
        (stock) => stock.sizes.sizeValue === "none"
      );
      if (noneStock) {
        setSelectedSize("none");
      }
    }
  }, [product]);

  const handleCartAction = () => {
    if (!isAuthenticated) return navigate("/login");

    if (!product?.id) return;

    if (!selectedSize) {
      customToast({
        variant: "destructive",
        title: "Add item failed",
        description: "Please make sure to select the size and try again.",
      });
      return;
    }

    if (itemInCart) {
      // Remove from cart
      removeItemFromCart(product?.id, selectedSize);
      // After updating cart in localStorage
      window.dispatchEvent(new Event("cart-updated"));
      setItemInCart(false);
      toast.success("Removed from cart");
    } else {
      // Add to cart
      addItemToCart(product?.id, quantity, selectedSize);
      // After updating cart in localStorage
      window.dispatchEvent(new Event("cart-updated"));
      setItemInCart(true);
      toast.success("Added to cart");
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isPending) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="outline" className="mb-6" onClick={handleGoBack}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <Skeleton className="aspect-square w-full rounded-lg" />
          </div>
          <div className="md:w-1/2 space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-1/4" />
            <div className="space-y-2 pt-4">
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Button
          variant="outline"
          className="mb-6 absolute top-24 left-4 md:left-8 lg:left-12"
          onClick={handleGoBack}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">We couldn't find the product you're looking for.</p>
        <Button asChild>
          <Link to="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }

  // Calculate discounted price if applicable
  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="flex items-center mb-6">
        <Button
          variant="outline"
          onClick={handleGoBack}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product?.image}
              alt={product?.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product?.title}</h1>

          {/* Price */}
          <div className="mb-4">
            {discountedPrice ? (
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ${product?.price.toFixed(2)}
                </span>
                <Badge variant="destructive">{product?.discount}% OFF</Badge>
              </div>
            ) : (
              <span className="text-2xl font-bold">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock Indicator */}
          <StockIndicator
            stock={product.products_stock.reduce(
              (acc, cur) => acc + cur.itemCount,
              0
            )}
            inStock={
              product.products_stock.reduce(
                (acc, cur) => acc + cur.itemCount,
                0
              ) > 0
            }
          />

          <SoldIndicator sold={product.sold} />

          {/* Description */}
          <p className="text-muted-foreground mb-6">{product?.description}</p>

          {/* Size selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.products_stock.map((stock) => (
                <button
                  key={stock.id}
                  className={`min-w-10 h-10 rounded-md border ${
                    selectedSize === stock.sizes.sizeValue
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input hover:border-primary disabled:border-none"
                  } ${stock.sizes.sizeValue === "none" ? "px-1" : ""}`}
                  onClick={() => setSelectedSize(stock.sizes.sizeValue)}
                  disabled={stock.sizes.sizeValue === "none"}
                >
                  {stock.sizes.sizeValue === "none"
                    ? "Size not available"
                    : stock.sizes.sizeValue}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Quantity</h3>
            <div className="flex items-center">
              <button
                className="w-10 h-10 rounded-l-md border border-input flex items-center justify-center"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <div className="w-12 h-10 border-t border-b border-input flex items-center justify-center">
                {quantity}
              </div>
              <button
                className="w-10 h-10 rounded-r-md border border-input flex items-center justify-center"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= 10}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              className="flex-1"
              disabled={
                !(
                  product?.products_stock.reduce(
                    (acc, cur) => acc + cur.itemCount,
                    0
                  ) > 0
                )
              }
              onClick={handleCartAction}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {!(
                product.products_stock.reduce(
                  (acc, cur) => acc + cur.itemCount,
                  0
                ) > 0
              )
                ? "Out of Stock"
                : itemInCart
                ? "Already Added"
                : "Add to Cart"}
            </Button>

            <Button
              variant="outline"
              className="flex-1"
              onClick={handleToggleFavorite}
              disabled={
                isPendingFavorites ||
                isPendingAddFavorite ||
                isPendingDeleteFavorite
              }
            >
              <Heart
                className={`mr-2 h-4 w-4 ${
                  isFavorite ? "fill-red-500 text-red-500" : ""
                }`}
              />
              {isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
            </Button>
          </div>

          {/* Product details tabs */}
          <Tabs defaultValue="details">
            <TabsList className="w-full">
              <TabsTrigger value="details" className="flex-1">
                Details
              </TabsTrigger>
              <TabsTrigger value="shipping" className="flex-1">
                Shipping
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1">
                Reviews
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="py-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Product Features:</h4>
                  {product.productFeatures &&
                  product.productFeatures.length > 0 ? (
                    <ul className="list-disc list-inside ml-4 text-gray-600">
                      {product.productFeatures.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 ml-4">No features listed.</p>
                  )}
                </div>
                <div>
                  <h4 className="font-medium">Material & Care:</h4>
                  {product.materialAndCare ? (
                    <p className="text-gray-600">{product.materialAndCare}</p>
                  ) : (
                    <p className="text-gray-500">
                      No material & care instructions provided.
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="py-4">
              <div className="space-y-4 text-gray-600">
                <div>
                  <strong>Express Shipping:</strong>
                  <div>Delivery: 2-3 business days</div>
                  {isPendingSetting ? (
                    <div>Loading...</div>
                  ) : (
                    <div>
                      Fee: ${Number(setting?.shippingFee ?? 0).toFixed(2)} (free
                      for orders over $
                      {Number(setting?.freeShippingThreshold ?? 0).toFixed(2)})
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="py-4">
              <ProductReviews productId={id || ""} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
        {isPendingProductsRelated ? (
          <ProductList items={[]} isLoading={true} />
        ) : productsRelated && productsRelated.length > 0 ? (
          <ProductList items={productsRelated} isLoading={false} />
        ) : (
          <div className="text-center text-gray-500 py-8">
            No related products found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
