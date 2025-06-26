import React, { useEffect } from "react";
import SignupForm from "@/components/SignupForm";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../customs/hooks/authentication/useAuthUser";
import Spinner from "../components/ui/Spinner";

const Signup = () => {
  const { isPending, isAuthenticated } = useAuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !isPending) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated || isPending) return <Spinner />; // prevent flicker during redirect

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[80vh] px-4 py-8">
      <SignupForm />
    </div>
  );
};

export default Signup;
