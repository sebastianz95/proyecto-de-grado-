import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    try { return JSON.parse(localStorage.getItem("usuario")); } catch { return null; }
  });

  function loginCtx(datos) {
    localStorage.setItem("usuario", JSON.stringify(datos));
    localStorage.setItem("token", datos.token);
    setUsuario(datos);
  }

  function logout() {
    localStorage.clear();
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, login: loginCtx, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }
