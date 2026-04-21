import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage"; // <--- Importa tu Landing
import ForgotPassword from "./pages/ForgotPassword"; // <--- Importa tu recuperación
import Dashboard from "./pages/Dashboard";
import Inventario from "./pages/Inventario";
import Ordenes from "./pages/Ordenes";
import Proveedores from "./pages/Proveedores";
import Reportes from "./pages/Reportes";
import Configuracion from "./pages/Configuracion";
import "./styles/global.css";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* 1. La Landing es ahora la entrada principal */}
          <Route path="/" element={<LandingPage />} />
          
          {/* 2. Rutas Públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/restablecer" element={<ForgotPassword />} />

          {/* 3. Rutas Privadas (Requieren Login) */}
          <Route path="/app" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard"      element={<Dashboard />} />
            <Route path="inventario"     element={<Inventario />} />
            <Route path="ordenes"        element={<Ordenes />} />
            <Route path="proveedores"    element={<Proveedores />} />
            <Route path="reportes"       element={<Reportes />} />
            <Route path="configuracion"  element={<Configuracion />} />
          </Route>

          {/* Redirección por si entran a una ruta que no existe */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}