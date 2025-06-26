import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../../services/apiAuth";
// import { toast } from "react-hot-toast";
import { useToast } from "../../../components/ui/use-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    mutate: updateUser,

    isPending: isUpdating,
  } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: ({ user }) => {
      // this one is no need to refetch the data
      queryClient.setQueryData(["user"], user);

      toast({
        title: "Update successful",
        description: "User account successfully updated",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: error.message || "Something went wrong, please try again.",
      });
    },
  });

  return { updateUser, isUpdating };
}
