import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ProductList from "@/components/ProductList";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import SpinnerMini from "../components/ui/SpinnerMini";
import { useProducts } from "../customs/hooks/product/useProducts";
import { useCategories } from "../customs/hooks/category/useCategories";
import { useMemo } from "react";

const ProductsPage = () => {
  const { products, isPending } = useProducts();
  const { categories, isPending: isPendingCategories } = useCategories();

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [searchInput, setSearchInput] = useState(searchQuery);

  const selectedCategories = searchParams.getAll("category");
  const selectedRangeMinPrice = searchParams.get("minPrice") || 0;
  const selectedRangeMaxPrice = searchParams.get("maxPrice") || 200;

  // const [filteredProducts, setFilteredProducts] = useState([]);

  // Filter states
  // const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (searchInput) {
        params.set("search", searchInput);
      } else {
        params.delete("search");
      }
      setSearchParams(params, { replace: false });
    }, 300); // 300ms debounce

    return () => clearTimeout(handler);
    // eslint-disable-next-line
  }, [searchInput]);

  useEffect(() => {
    setSearchInput(searchQuery);
    // eslint-disable-next-line
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    const valueLower = value.toLowerCase();

    // Build new categories array
    const newCategories = checked
      ? [...selectedCategories, valueLower]
      : selectedCategories.filter((cat) => cat !== valueLower);

    // Create a new params object without any "category"
    const params = new URLSearchParams();
    for (const [key, val] of searchParams.entries()) {
      if (key !== "category") params.append(key, val);
    }
    // Add all categories
    newCategories.forEach((cat) => params.append("category", cat));
    setSearchParams(params, { replace: false });
  };

  const handleRangePriceChange = (range) => {
    // range is an array like [min, max] from the Slider
    const params = new URLSearchParams(searchParams);

    if (range[0] !== 0) {
      params.set("minPrice", range[0]);
    } else {
      params.delete("minPrice");
    }

    if (range[1] !== 200) {
      params.set("maxPrice", range[1]);
    } else {
      params.delete("maxPrice");
    }

    setSearchParams(params, { replace: false });
  };

  // ...other code...

  const filteredProducts = useMemo(() => {
    if (isPending || !products) return [];

    let filtered = [...products];

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        product.products_categories.some((pc) =>
          selectedCategories.includes(pc.categories.category.toLowerCase())
        )
      );
    }

    // Price filter
    filtered = filtered.filter(
      (p) =>
        p.price >= Number(selectedRangeMinPrice) &&
        p.price <= Number(selectedRangeMaxPrice)
    );

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "discount-low":
        filtered.sort((a, b) => {
          if (!a.discount && !b.discount) return 0;
          if (!a.discount) return 1;
          if (!b.discount) return -1;
          return a.discount - b.discount;
        });
        break;
      case "discount-high":
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      case "newest":
        filtered.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        break;
      default:
        break;
    }

    return filtered;
  }, [
    products,
    isPending,
    selectedCategories,
    selectedRangeMinPrice,
    selectedRangeMaxPrice,
    sortBy,
  ]);

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

      <h1 className="text-3xl font-bold mb-2">
        {selectedCategories.length > 0
          ? `${(() => {
              const cats = selectedCategories.map(
                (cat) => cat.charAt(0).toUpperCase() + cat.slice(1)
              );
              if (cats.length === 1) return `${cats[0]}'s Collection`;
              if (cats.length === 2)
                return `${cats[0]} and ${cats[1]}'s Collection`;
              return `${cats.slice(0, -1).join(", ")} and ${cats.slice(
                -1
              )}'s Collection`;
            })()}`
          : "All Products"}
      </h1>
      <p className="text-gray-600 mb-8">
        {filteredProducts.length} products found
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters sidebar */}
        <div className="w-full lg:w-64 space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Categories</h3>
            <div className="space-y-2">
              {isPendingCategories ? (
                <div className=" flex justify-center items-center flex-col">
                  <SpinnerMini size="1.5rem" />
                  <p>Loading categories...</p>
                </div>
              ) : (
                categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category.category}`}
                      className="mr-2"
                      value={category.category.toLowerCase()}
                      checked={selectedCategories.includes(
                        category.category.toLowerCase()
                      )}
                      onChange={handleCategoryChange}
                    />
                    <label htmlFor={`category-${category.category}`}>
                      {category.category}
                    </label>
                  </div>
                ))
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Price Range</h3>
            <div className="px-2">
              <Slider
                defaultValue={[0, 200]}
                min={0}
                max={200}
                step={10}
                onValueChange={handleRangePriceChange}
              />
              <div className="flex items-center justify-between mt-2">
                <span>{selectedRangeMinPrice}</span>
                <span>{selectedRangeMaxPrice}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="flex-1">
          {/* Sort controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="w-full sm:w-auto">
              <Input
                name="searchInput"
                placeholder="Search products..."
                className="max-w-xs"
                value={searchInput}
                onChange={handleSearchChange}
              />
            </div>

            <div className="w-full sm:w-auto">
              <Select defaultValue={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Default</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="discount-low">
                    Discount: Low to High
                  </SelectItem>
                  <SelectItem value="discount-high">
                    Discount: High to Low
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <ProductList items={filteredProducts} isLoading={isPending} />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
