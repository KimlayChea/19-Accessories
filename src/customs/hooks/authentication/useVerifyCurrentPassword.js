import { useMutation } from "@tanstack/react-query";
import { verifyCurrentPassword as verifyCurrentPasswordApi } from "../../../services/apiAuth";
import { useToast } from "../../../components/ui/use-toast";
export function useVerifyCurrentPassword() {
  const { toast } = useToast();

  const { mutate: verifyCurrentPassword, isPending } = useMutation({
    mutationFn: verifyCurrentPasswordApi,
    onError: () => {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "Please check your credentials and try again.",
      });
    },
  });

  return { verifyCurrentPassword, isPending };
}
