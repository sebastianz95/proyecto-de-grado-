import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import Login from "./pages/Login";
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
          <Route path="/"      element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route path="dashboard"      element={<Dashboard />} />
            <Route path="inventario"     element={<Inventario />} />
            <Route path="ordenes"        element={<Ordenes />} />
            <Route path="proveedores"    element={<Proveedores />} />
            <Route path="reportes"       element={<Reportes />} />
            <Route path="configuracion"  element={<Configuracion />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
