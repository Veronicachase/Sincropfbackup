import { useAuthContext } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth() {
  const { auth } = useAuthContext();

  return auth ? <Outlet /> : <Navigate to="/login" />;
}
export default RequireAuth;
