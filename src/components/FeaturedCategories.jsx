import { useNavigate } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useCategories } from "../customs/hooks/category/useCategories";

const FeaturedCategories = () => {
  const navigate = useNavigate();
  const { categories, isPendding } = useCategories();

  const handleCategoryClick = (cetegory) => {
    navigate(`/products?category=${cetegory}`);
  };

  const handleViewAll = () => {
    navigate("/products");
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Shop by Category</h2>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={handleViewAll}
        >
          View All <ChevronRight size={16} />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isPendding
          ? ""
          : categories?.map((category) => (
              <div
                key={category.id}
                className="group relative rounded-lg overflow-hidden cursor-pointer"
                onClick={() =>
                  handleCategoryClick(category.category.toLowerCase())
                }
              >
                <AspectRatio ratio={1 / 1}>
                  <div className="w-full h-full overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.category}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </AspectRatio>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-foreground text-xl font-semibold">
                    <span className="bg-background opacity-70 py-1 px-2 rounded-lg">
                      {category.category}
                    </span>
                  </h3>
                  <p className="text-foreground text-sm mt-2">
                    <span className="bg-background opacity-50 px-1 rounded-md">
                      {category.itemCount} items
                    </span>
                  </p>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
