import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFavorite as deleteFavoriteApi } from "../../../services/ApiFavorite";

export function useDeleteFavorite() {
  const queryclient = useQueryClient();

  const { isPending, mutate: deleteFavorite } = useMutation({
    mutationKey: ["favorites"],
    mutationFn: (id) => deleteFavoriteApi(id),
    onSuccess: () => {
      // This will cause any component using useFavorites to re-render with fresh data
      queryclient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: (error) => {
      console.error("onError called", error);
    },
  });

  return { isPending, deleteFavorite };
}
