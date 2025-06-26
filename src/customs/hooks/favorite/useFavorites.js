import { useQuery } from "@tanstack/react-query";
import { getFavorites as getFavoritesApi } from "../../../services/ApiFavorite";

export function useFavorites() {
  const { isPending, data: favorites } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavoritesApi,
  });

  return { favorites, isPending };
}
