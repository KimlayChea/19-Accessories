import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFavorite as addFavoriteApi } from "../../../services/ApiFavorite";

export function useAddFavorite() {
  const queryclient = useQueryClient();

  const { isPending, mutate: addFavorite } = useMutation({
    mutationKey: ["favorites"],
    mutationFn: (id) => addFavoriteApi(id),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: (error) => {
      console.error("onError called", error);
    },
  });

  return { isPending, addFavorite };
}
