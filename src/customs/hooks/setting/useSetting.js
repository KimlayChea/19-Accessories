import { useQuery } from "@tanstack/react-query";
import { getSetting } from "../../../services/apiSetting";

export function useSetting() {
  const { isPending, data: setting } = useQuery({
    queryKey: ["setting"],
    queryFn: getSetting,
  });

  return { setting, isPending };
}
