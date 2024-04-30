import { useAuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth() {
  const { auth } = useAuthContext();
  console.log(auth, "Esto es una prueba");
  return auth ? <Outlet /> : <Navigate to="/home" />;
}
export default RequireAuth;