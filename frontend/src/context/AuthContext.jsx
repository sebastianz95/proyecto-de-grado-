import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    // Recuperamos el usuario al cargar la app
    const saved = localStorage.getItem("usuario");
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Función para iniciar sesión
  const login = (datos) => {
    localStorage.setItem("usuario", JSON.stringify(datos));
    // Si tu API devuelve el token dentro de datos (ej: datos.token)
    if (datos.token) {
      localStorage.setItem("token", datos.token);
    }
    setUsuario(datos);
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}