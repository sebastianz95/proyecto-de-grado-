import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Layout.css";

// ── RUTAS ACTUALIZADAS ──────────────────────────────────────────
const menuItems = [
  { path: "/app/dashboard",     icon: "fas fa-home",          label: "Dashboard"      },
  { path: "/app/inventario",    icon: "fas fa-box",           label: "Inventario"     },
  // --- SE AGREGA FACTURACIÓN AQUÍ ---
  { path: "/app/facturacion",   icon: "fas fa-file-invoice-dollar", label: "Facturación" }, 
  { path: "/app/ordenes",       icon: "fas fa-shopping-cart", label: "Órdenes"        },
  { path: "/app/proveedores",   icon: "fas fa-users",         label: "Proveedores"    },
  { path: "/app/reportes",      icon: "fas fa-chart-bar",     label: "Reportes"       },
  { path: "/app/configuracion", icon: "fas fa-cog",           label: "Configuración"  },
];

function Layout() {
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem("sidebarState") === "collapsed"
  );
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("sidebarState", collapsed ? "collapsed" : "expanded");
  }, [collapsed]);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="container">
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`} id="sidebar">
        <div className="logo-container">
          <h2 className="logo" style={{ cursor: 'pointer' }} onClick={() => setCollapsed(!collapsed)}>
            Inventa
          </h2>
        </div>

        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => isActive ? "active" : ""}
              >
                <i className={item.icon}></i>
                {!collapsed && <span>{item.label}</span>} 
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="sidebar-footer">
          {!collapsed && (
            <p className="sidebar-user">
              <i className="fas fa-user-circle"></i> {usuario?.nombre || usuario?.username || "Usuario"}
            </p>
          )}
          <button className="logout-btn" onClick={handleLogout} title="Cerrar sesión">
            <i className="fas fa-sign-out-alt"></i>
            {!collapsed && <span>Salir</span>}
          </button>
        </div>
      </aside>

      <main className="main-content">
        {/* Aquí se renderizará Facturacion.jsx cuando entres a /app/facturacion */}
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;