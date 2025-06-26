import { useEffect } from "react";
import LoginForm from "@/components/LoginForm";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/ui/Spinner";
import { useAuthUser } from "../customs/hooks/authentication/useAuthUser";

const Login = () => {
  const { isPending, isAuthenticated } = useAuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !isPending) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, isPending]);

  if (isAuthenticated || isPending) return <Spinner />; // prevent flicker during redirect

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[80vh] px-4 py-8">
      <LoginForm />
    </div>
  );
};

export default Login;
