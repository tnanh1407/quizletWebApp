import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../logic/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return children;
}
