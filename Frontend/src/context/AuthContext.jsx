/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";


const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export default function AuthContextProvider({ children }) {
  let userStorage = JSON.parse(localStorage.getItem("user") )||null;
  const [auth, setAuth] = useState(userStorage);
  const [errorMessage, setErrorMessage] = useState("");

  console.log(localStorage.getItem("user"));

  useEffect(() => {
    
    if (auth) {
      localStorage.setItem("user", JSON.stringify(auth));
    } else {
      localStorage.removeItem("user");
    }
  }, [auth]);

  async function login(email, password) {
    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      console.log(data, "soy el resultado de data de auth")
      if (response.ok) {
        setAuth(data); 
        localStorage.setItem("user", JSON.stringify(data)); 
        setErrorMessage("");
      } else {
        throw new Error(data.message || 'Error de autenticación');
      }
    } catch (error) {
      console.error('Error al intentar iniciar sesión:', error);
      setErrorMessage(error.message);
      setAuth(null);
    }
  }
  
  function logout() {
    setAuth(null);
    localStorage.removeItem("user");
  }
  const value = {
    auth,
    login,
    logout,
    errorMessage,
  };
  return <AuthContext.Provider value={value}> {children}</AuthContext.Provider>;
}
