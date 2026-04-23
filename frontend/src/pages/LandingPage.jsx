// src/pages/Landing.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

// ── COMPONENTE TOAST ─────────────────────────────
function Toast({ title, message, visible }) {
  return (
    <div className={`toast ${visible ? "show" : ""}`}>
      <div className="toast-title">{title}</div>
      <div className="toast-msg">{message}</div>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate(); 
  const [scrolled, setScrolled] = useState(false);
  const [toast, setToast] = useState({ visible: false, title: "", message: "" });

  // Efecto de scroll para el Navbar
  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 20); }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Efecto de revelación al hacer scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { 
          e.target.classList.add("visible"); 
          observer.unobserve(e.target); 
        }
      }),
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function showToast(title, message) {
    setToast({ visible: true, title, message });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3500);
  }

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="landing-root">
      <Toast title={toast.title} message={toast.message} visible={toast.visible} />

      {/* ══ NAVBAR ══ */}
      <nav className={`l-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="logo">
          <div className="logo-icon">📦</div>
          INVENTA
        </div>
        <ul>
          <li><a href="#about" onClick={e => { e.preventDefault(); scrollTo("about"); }}>Nosotros</a></li>
          <li><a href="#services" onClick={e => { e.preventDefault(); scrollTo("services"); }}>Servicios</a></li>
          <li><a href="#contact" onClick={e => { e.preventDefault(); scrollTo("contact"); }}>Contacto</a></li>
        </ul>
        <div className="nav-btns">
          {/* BOTÓN INICIAR SESIÓN: Va al login normal */}
          <button className="btn-outline" onClick={() => navigate("/login")}>
            Iniciar sesión
          </button>
          {/* BOTÓN REGISTRARSE: Envía el parámetro mode=register */}
          <button className="btn-filled" onClick={() => navigate("/login?mode=register")}>
            Registrarse
          </button>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section id="hero">
        <div className="hero-bg" />
        <div className="hero-grid">
          <div>
            <span className="hero-tag">▸ Sistema de gestión de inventario</span>
            <h1>Controla tu inventario con <span className="blue">precisión total</span></h1>
            <p className="hero-sub">
              Inventa te da visibilidad completa sobre tus productos, stock y movimientos
              en tiempo real. Diseñado para negocios colombianos que quieren crecer.
            </p>
            <div className="hero-actions">
              {/* BOTÓN "Comenzar gratis" redirige a Registro */}
              <button className="btn-filled btn-lg" onClick={() => navigate("/login?mode=register")}>
                Comenzar gratis
              </button>
              <button className="btn-outline btn-lg" onClick={() => scrollTo("services")}>
                Ver funciones →
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="dash-mock">
              <div className="dash-header">
                <div className="dash-dot" style={{ background: "#ff5f57" }} />
                <div className="dash-dot" style={{ background: "#ffc027", marginLeft: 4 }} />
                <div className="dash-dot" style={{ background: "#29c940", marginLeft: 4 }} />
                <span className="dash-title">INVENTA — Dashboard</span>
              </div>
              <div className="dash-body">
                <div className="dash-label">▸ Resumen general</div>
                <div className="dash-cards">
                  {[["Total Productos","34,534"],["Ventas","$20,238"],["Proveedores","8,944"]].map(([l,v]) => (
                    <div className="dash-card" key={l}>
                      <div className="dash-card-label">{l}</div>
                      <div className="dash-card-value">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <div id="stats">
        <div className="stats-grid">
          {[["+500","Empresas activas"],["2M+","Productos gestionados"],["99.9%","Disponibilidad"],["24/7","Soporte técnico"]].map(([n,l]) => (
            <div className="stat-item reveal" key={l}>
              <div className="stat-num">{n}</div>
              <div className="stat-label">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ ABOUT ══ */}
      <section id="about">
        <div className="section-inner about-grid">
          <div className="about-text reveal">
            <span className="section-tag">▸ Quiénes somos</span>
            <h2>La solución colombiana para gestión de inventario</h2>
            <p>Inventa nació en Colombia para resolver los retos reales del comercio local. Sabemos lo que significa perder ventas por descontrol de stock.</p>
            <div className="features-list">
              {[
                "Seguimiento de stock en tiempo real",
                "Alertas automáticas de inventario bajo",
                "Integración con proveedores locales",
                "Reportes detallados para decisiones con datos",
              ].map(f => (
                <div className="feature-item" key={f}>
                  <span className="feature-icon">▸</span><span>{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="about-panels reveal">
            {[
              ["🎯 Nuestra misión", "Dar a cada negocio colombiano la capacidad de gestionar su inventario como una gran empresa."],
              ["⚡ Por qué Inventa", "Construidos desde cero pensando en las necesidades reales de tiendas y distribuidores."],
              ["🔒 Seguridad", "Tus datos están protegidos con cifrado de nivel bancario y copias de seguridad."],
            ].map(([t,p]) => (
              <div className="about-panel" key={t}>
                <h4>{t}</h4><p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SERVICIOS ══ */}
      <section id="services">
        <div className="section-inner">
          <div className="services-head reveal">
            <span className="section-tag">▸ Nuestros servicios</span>
            <h2>Todo lo que necesitas</h2>
          </div>
          <div className="services-grid">
            {[
              ["📦","Control de Stock","Registra entradas y salidas con precisión total."],
              ["🔔","Alertas Inteligentes","Notificaciones cuando un producto esté por agotarse."],
              ["📊","Analítica","Dashboards en tiempo real con datos de ventas y rotación."],
              ["🚚","Proveedores","Administra órdenes de compra y entregas."],
            ].map(([i,t,d]) => (
              <div className="service-card reveal" key={t}>
                <div className="service-icon">{i}</div>
                <div className="service-title">{t}</div>
                <div className="service-desc">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACTO ══ */}
      <section id="contact">
        <div className="section-inner contact-grid">
          <div className="contact-info reveal">
            <span className="section-tag">▸ Contáctanos</span>
            <h2>¿Listo para ordenar tu inventario?</h2>
            {[["📧","hola@inventa.com.co"],["📞","+57 (315) 859-4567"]].map(([i,t]) => (
              <div className="contact-detail" key={t}>
                <span className="icon">{i}</span><span>{t}</span>
              </div>
            ))}
          </div>
          <div className="contact-form reveal">
            <div className="form-row">
              <div className="form-group"><label>Nombre</label><input type="text" placeholder="Tu nombre" /></div>
              <div className="form-group"><label>Empresa</label><input type="text" placeholder="Tu empresa" /></div>
            </div>
            <div className="form-group"><label>Correo</label><input type="email" placeholder="correo@empresa.com" /></div>
            <div className="form-group">
              <label>Mensaje</label>
              <textarea placeholder="Cuéntanos sobre tu negocio..." />
            </div>
            <button className="btn-submit" onClick={() => showToast("¡Enviado!", "Te contactaremos pronto.")}>
              Enviar mensaje →
            </button>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer>
        <div className="logo" style={{ fontSize: "1.3rem" }}>
          <div className="logo-icon" style={{ width: 22, height: 22, fontSize: "0.7rem" }}>📦</div>
          INVENTA
        </div>
        <div className="footer-copy">© 2025 Inventa — Colombia.</div>
        <div className="footer-links">
          <a href="#">Privacidad</a>
          <a href="#">Términos</a>
          <a href="#contact" onClick={e => { e.preventDefault(); scrollTo("contact"); }}>Contacto</a>
        </div>
      </footer>
    </div>
  );
}