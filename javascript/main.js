/* ══════════════════════════════════════════════
   INVENTA — main.js
════════════════════════════════════════════════ */

/* ──────────────────────────────────────────────
   MODAL — Abrir / Cerrar
────────────────────────────────────────────── */

/**
 * Abre el modal de autenticación.
 * @param {string} tab - 'login' o 'register'
 */
function openModal(tab = "login") {
  const overlay = document.getElementById("authModal");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden"; // evita scroll de fondo
  switchTab(tab);
}

/**
 * Cierra el modal de autenticación.
 */
function closeModal() {
  const overlay = document.getElementById("authModal");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

/**
 * Cambia entre las pestañas Login / Register dentro del modal.
 * @param {string} tab - 'login' o 'register'
 */
function switchTab(tab) {
  const tabs = document.querySelectorAll(".modal-tab");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  // Activar pestaña correcta
  tabs[0].classList.toggle("active", tab === "login");
  tabs[1].classList.toggle("active", tab === "register");

  // Mostrar formulario correcto
  loginForm.style.display = tab === "login" ? "block" : "none";
  registerForm.style.display = tab === "register" ? "block" : "none";
}

// Cerrar modal al hacer clic fuera del contenido
document.getElementById("authModal").addEventListener("click", function (e) {
  if (e.target === this) closeModal();
});

// Cerrar modal con tecla Escape
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});

/* ──────────────────────────────────────────────
   TOAST — Notificaciones temporales
────────────────────────────────────────────── */

/**
 * Muestra una notificación toast en la esquina inferior derecha.
 * @param {string} title   - Título breve (en azul)
 * @param {string} message - Mensaje descriptivo
 * @param {number} duration - Duración en ms (default: 3500)
 */
function showToast(title, message, duration = 3500) {
  closeModal(); // cierra el modal si estaba abierto

  const toast = document.getElementById("toast");
  const toastTitle = document.getElementById("toast-title");
  const toastMsg = document.getElementById("toast-msg");

  toastTitle.textContent = title;
  toastMsg.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, duration);
}

/* ──────────────────────────────────────────────
   SCROLL REVEAL — Animación al hacer scroll
────────────────────────────────────────────── */

// Añadir clase al body para que el CSS active las animaciones
document.body.classList.add("js-ready");

/**
 * Observa todos los elementos con clase .reveal
 * y les añade .visible cuando entran en el viewport.
 */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.05, rootMargin: "0px 0px -40px 0px" },
);

document.querySelectorAll(".reveal").forEach((el) => {
  revealObserver.observe(el);
});

/* ──────────────────────────────────────────────
   NAVBAR — Cambio de estilo al hacer scroll
────────────────────────────────────────────── */

const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navbar.style.borderBottomColor = "rgba(30, 144, 255, 0.15)";
  } else {
    navbar.style.borderBottomColor = "rgba(255, 255, 255, 0.06)";
  }
});

/* ──────────────────────────────────────────────
   SMOOTH SCROLL — Links del navbar
────────────────────────────────────────────── */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
function goToLogin() {
  window.location.href = "dashboard/dashboar.html";
}
