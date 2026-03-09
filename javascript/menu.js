document.addEventListener("DOMContentLoaded", function () {
  const sidebar = `
        <aside class="sidebar">
            <h2 class="logo">Inventa</h2>
            <ul>
                <li class="menu-item" data-page="dashboard.html">
                    <a href="dashboard.html">
                        <i class="fas fa-home"></i>
                        <span>Dashboard</span>
                    </a>
                </li>

                <li class="menu-item" data-page="inventario.html">
                    <a href="inventario.html">
                        <i class="fas fa-box"></i>
                        <span>Inventario</span>
                    </a>
                </li>

                <li class="menu-item" data-page="ordenes.html">
                    <a href="ordenes.html">
                        <i class="fas fa-shopping-cart"></i>
                        <span>Órdenes</span>
                    </a>
                </li>

                <li class="menu-item" data-page="proveedores.html">
                    <a href="proveedores.html">
                        <i class="fas fa-users"></i>
                        <span>Proveedores</span>
                    </a>
                </li>

                <li class="menu-item" data-page="reportes.html">
                    <a href="reportes.html">
                        <i class="fas fa-chart-bar"></i>
                        <span>Reportes</span>
                    </a>
                </li>

                <li class="menu-item" data-page="configuracion.html">
                    <a href="configuracion.html">
                        <i class="fas fa-cog"></i>
                        <span>Configuración</span>
                    </a>
                </li>
            </ul>
        </aside>
    `;

  document.getElementById("sidebar-container").innerHTML = sidebar;

  // Marcar activo automáticamente
  const currentPage = window.location.pathname.split("/").pop();

  document.querySelectorAll(".menu-item").forEach((item) => {
    if (item.getAttribute("data-page") === currentPage) {
      item.classList.add("active");
    }
  });
});
