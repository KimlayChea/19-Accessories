import { useQuery } from "@tanstack/react-query";
import { getProductsRelated } from "../../../services/apiProduct";
import { useParams } from "react-router-dom";

export function useProductsRelated() {
  const { id } = useParams();

  const { isPending, data: productsRelated } = useQuery({
    queryKey: ["productsRelated", id],
    queryFn: () => getProductsRelated(id),
  });

  return { productsRelated, isPending };
}
