import { useAuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";



function RequireAuth() {
  const { auth } = useAuthContext();
  console.log(auth, "Esto es una prueba desde el requireAuth");
  return auth ? <Outlet /> : <Navigate to="/login" />;
}
export default RequireAuth;