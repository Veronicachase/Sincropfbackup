import { useAuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

// aqui he cambiado home por prject-info para hacer unas pruebas, una vez concluidas vuelvo a colocar home


function RequireAuth() {
  const { auth } = useAuthContext();
  console.log(auth, "Esto es una prueba");
  return auth ? <Outlet /> : <Navigate to="/my-projects" />;
}
export default RequireAuth;