/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Crear el contexto de autenticación
const AuthContext = createContext(null);
const apiUrl = import.meta.env.VITE_API_URL;
// Hook para usar el contexto de autenticación
export function useAuthContext() {
  return useContext(AuthContext);
}

// Proveedor de contexto de autenticación
export default function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Función para iniciar sesión
  async function login(email, password) {
    try {
      const response = await fetch(`${apiUrl}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setAuth(data.user);
        setErrorMessage("");
        navigate("/home");
      } else {
        throw new Error(data.message || "Error de autenticación");
      }
    } catch (error) {
      console.error("Error al intentar iniciar sesión:", error);
      setErrorMessage(error.message);
      setAuth(null);
    }
  }

  // Función para cerrar sesión
  async function logout() {
    try {
      localStorage.removeItem("token");
      setAuth(null);
      navigate("/login");
    } catch (error) {
      console.error("Error al intentar cerrar sesión:", error);
      setErrorMessage(error.message);
    }
  }

  // Función para verificar la autenticación
  async function checkAuth() {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    try {
      const response = await fetch(`${apiUrl}/users/verify-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAuth(data.user);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      logout();
    }
  }

  // Valor del contexto
  const value = {
    auth,
    login,
    logout,
    errorMessage,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
