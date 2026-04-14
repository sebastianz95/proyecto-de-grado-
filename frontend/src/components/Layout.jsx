import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Layout.css";

const menuItems = [
  { path: "/dashboard",     icon: "fas fa-home",          label: "Dashboard"     },
  { path: "/inventario",    icon: "fas fa-box",           label: "Inventario"    },
  { path: "/ordenes",       icon: "fas fa-shopping-cart", label: "Órdenes"       },
  { path: "/proveedores",   icon: "fas fa-users",         label: "Proveedores"   },
  { path: "/reportes",      icon: "fas fa-chart-bar",     label: "Reportes"      },
  { path: "/configuracion", icon: "fas fa-cog",           label: "Configuración" },
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
          <h2 className="logo" onClick={() => setCollapsed(!collapsed)}>Inventa</h2>
        </div>

        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink to={item.path} className={({ isActive }) => isActive ? "active" : ""}>
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="sidebar-footer">
          {!collapsed && (
            <p className="sidebar-user">
              <i className="fas fa-user-circle"></i> {usuario?.nombre || usuario?.email}
            </p>
          )}
          <button className="logout-btn" onClick={handleLogout} title="Cerrar sesión">
            <i className="fas fa-sign-out-alt"></i>
            <span>Salir</span>
          </button>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
