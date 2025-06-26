import { useQuery } from "@tanstack/react-query";
import { getProductCarts } from "../../../services/apiProduct";

export function useProductCarts(productCartIds) {
  const { isPending, data: products } = useQuery({
    queryKey: ["product", productCartIds],
    queryFn: () => getProductCarts(productCartIds),
  });

  return { products, isPending };
}
