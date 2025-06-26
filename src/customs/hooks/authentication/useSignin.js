import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../../services/apiAuth";
import { useToast } from "../../../components/ui/use-toast";

export function useLogin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (user) => {
      // console.log(user); // {user, session}

      // set data to cache
      queryClient.setQueryData(["user"], user.user);
      queryClient.invalidateQueries(["favorites"]);

      toast({
        title: "Login successful",
        description: `Welcome back, ${user.user.user_metadata.fullName}`,
      });
    },
    onError: (error) => {
      console.error("login failed:", error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your credentials and try again.",
      });
    },
  });

  return { login, isPending };
}
