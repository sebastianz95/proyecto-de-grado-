document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("toggle-btn");
  const sidebar = document.getElementById("sidebar");

  // Restaurar estado del sidebar
  if (localStorage.getItem("sidebarState") === "collapsed") {
    sidebar.classList.add("collapsed");
  }

  toggleBtn.addEventListener("click", function () {
    sidebar.classList.toggle("collapsed");

    if (sidebar.classList.contains("collapsed")) {
      localStorage.setItem("sidebarState", "collapsed");
    } else {
      localStorage.setItem("sidebarState", "expanded");
    }
  });

  // Activar menú actual
  const links = document.querySelectorAll(".sidebar ul li a");
  const currentPage = window.location.href;

  links.forEach((link) => {
    if (currentPage.includes(link.getAttribute("href"))) {
      link.classList.add("active");
    }
  });
});
