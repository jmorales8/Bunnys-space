import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { state } = useAuth();
  if (state === "loading") return null;          // or spinner
  if (state === "anonymous") return <Navigate to="/login" replace />;
  return children;
}
