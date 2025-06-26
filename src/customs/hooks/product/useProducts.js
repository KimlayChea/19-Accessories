import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../services/apiProduct";
import { useSearchParams } from "react-router-dom";

export function useProducts(LIMIT_ROW = null) {
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";

  const filters = {
    categories: searchParams.getAll("category").map((category) => category),
    minPrice: Number(searchParams.get("minPrice")),

    maxPrice: Number(searchParams.get("maxPrice")),
  };

  const { isPending, data: products } = useQuery({
    queryKey: ["products", filters, searchQuery],
    queryFn: () => getProducts({ LIMIT_ROW, filters, searchQuery }),
    // staleTime: 0, // Data is always stale, so always refetch
    // cacheTime: 0, // Data is immediately garbage collected after unused
  });

  return { products, isPending };
}
