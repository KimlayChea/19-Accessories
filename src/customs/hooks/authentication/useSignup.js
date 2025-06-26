import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../../services/apiAuth";
import { useToast } from "../../../components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      navigate("/");
      toast({
        title: "Account created",
        description:
          "Your account has been created successfully! Please check your email and confirm your account to continue.",
      });
    },
    onError: (error) => {
      console.error("Signup failed:", error);
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: "Account already exists or an error occurred",
      });
    },
  });

  return { signup, isPending };
}
