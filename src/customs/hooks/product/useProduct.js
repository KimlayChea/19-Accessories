import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../../services/apiProduct";
import { useParams } from "react-router-dom";

export function useProduct() {
  const { id } = useParams();

  const { isPending, data: product } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });

  return { product, isPending };
}
