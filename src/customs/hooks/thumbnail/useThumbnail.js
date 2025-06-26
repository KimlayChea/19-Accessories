import { useQuery } from "@tanstack/react-query";
import { getThumbnail } from "../../../services/apiThumbnail";

export function useThumbnail() {
  const { isPending, data: thumbnail } = useQuery({
    queryKey: ["thumbnail"],
    queryFn: getThumbnail,
  });

  return { thumbnail, isPending };
}
