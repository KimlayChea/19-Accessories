import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthUser } from "../customs/hooks/authentication/useAuthUser";
import Spinner from "./ui/Spinner";

function ProtectedRoute({ children }) {
  // this function only allow in the callback, not in the top level of the component
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isPending, isAuthenticated } = useAuthUser();

  // 2. If there is no authenticated user, redirect to the /login
  useEffect(() => {
    if (!isPending && !isAuthenticated) {
      navigate("/login");
    }
  }, [isPending, isAuthenticated, navigate]);

  // 3. While loading, show a spinner
  if (isPending) return <Spinner />;

  // 4. If there is a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
