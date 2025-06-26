import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import ProductList from "@/components/ProductList";

import HeroSection from "@/components/HeroSection";
import FeaturedCategories from "@/components/FeaturedCategories";
import { useUser } from "@/contexts/UserContext";
import { useProducts } from "@/customs/hooks/product/useProducts";
import { useNavigate } from "react-router-dom";
import { LIMIT_ROW } from "../utils/constants";

const Index = () => {
  const { products, isPending } = useProducts(LIMIT_ROW);
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/products");
  };

  const { isDarkMode } = useUser();

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Categories */}
      <div className="container mx-auto py-12 px-4">
        <FeaturedCategories />

        {/* Featured Products */}
        <section className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleShopNow}
            >
              View All <ShoppingBag size={16} />
            </Button>
          </div>

          <ProductList items={products} isLoading={isPending} />

          <div className="flex justify-center mt-9">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleShopNow}
            >
              View All <ShoppingBag size={16} />
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
