import { useQuery } from "@tanstack/react-query";
import { getInStock } from "../../../services/apiProduct";

export function useInStock(id) {
  const { isPending, data: inStock } = useQuery({
    queryKey: ["inStock", id],
    queryFn: () => getInStock(id),
    enabled: !!id, // only run if id is provided
  });

  return { inStock, isPending };
}
