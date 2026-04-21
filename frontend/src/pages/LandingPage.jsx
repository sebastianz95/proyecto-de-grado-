// src/pages/Landing.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importante para la navegación
import "./Landing.css";

// ── COMPONENTE TOAST (Se queda igual) ─────────────────────────────
function Toast({ title, message, visible }) {
  return (
    <div className={`toast ${visible ? "show" : ""}`}>
      <div className="toast-title">{title}</div>
      <div className="toast-msg">{message}</div>
    </div>
  );
}

// NOTA: He eliminado el componente AuthModal porque ahora usaremos tu página de Login independiente.

export default function Landing() {
  const navigate = useNavigate(); // Hook para movernos entre páginas
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
        if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
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
      {/* Ya no llamamos al AuthModal aquí */}
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
          {/* CAMBIO CLAVE: Ahora redirigen a tu página de Login real */}
          <button className="btn-outline" onClick={() => navigate("/login")}>
            Iniciar sesión
          </button>
          <button className="btn-filled" onClick={() => navigate("/login")}>
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
              {/* CAMBIO CLAVE: Botón del Hero también redirige al Login */}
              <button className="btn-filled btn-lg" onClick={() => navigate("/login")}>
                Comenzar gratis
              </button>
              <button className="btn-outline btn-lg" onClick={() => scrollTo("services")}>
                Ver funciones →
              </button>
            </div>
          </div>

          {/* Dashboard Mockup (Se queda igual) */}
          <div className="hero-visual">
            <div className="dash-mock">
              <div className="dash-header">
                <div className="dash-dot" style={{ background: "#ff5f57" }} />
                <div className="dash-dot" style={{ background: "#ffc027", marginLeft: 4 }} />
                <div className="dash-dot" style={{ background: "#29c940", marginLeft: 4 }} />
                <span className="dash-title">INVENTA — Dashboard</span>
              </div>
              <div className="dash-body">
                {/* ... contenido del mockup ... */}
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

      {/* ... El resto de tus secciones (Stats, About, Services, Contact, Footer) se quedan exactamente igual ... */}
      {/* Asegúrate de mantenerlas para no perder el diseño */}
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
            <p>Inventa nació en Colombia para resolver los retos reales del comercio local. Sabemos lo que significa perder ventas por descontrol de stock, o tomar decisiones sin datos confiables.</p>
            <p>Somos un equipo de ingenieros y empresarios que construyeron la plataforma que ellos mismos necesitaban: simple, poderosa y adaptada a la realidad del mercado colombiano.</p>
            <div className="features-list">
              {[
                "Seguimiento de stock en tiempo real para cualquier tipo de producto",
                "Alertas automáticas de inventario bajo o agotado",
                "Integración con tus proveedores y canales de venta",
                "Reportes detallados para tomar decisiones con datos",
              ].map(f => (
                <div className="feature-item" key={f}>
                  <span className="feature-icon">▸</span><span>{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="about-panels reveal">
            {[
              ["🎯 Nuestra misión", "Dar a cada negocio colombiano, sin importar su tamaño, la capacidad de gestionar su inventario como una gran empresa, con tecnología accesible y soporte local."],
              ["⚡ Por qué Inventa", "No somos un software genérico adaptado. Fuimos construidos desde cero pensando en las necesidades reales de distribuidores, tiendas y negocios de Colombia."],
              ["🔒 Seguridad y confiabilidad", "Tus datos están protegidos con cifrado de nivel bancario, copias de seguridad automáticas y una infraestructura con 99.9% de disponibilidad garantizada."],
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
            <h2>Todo lo que necesitas para gestionar tu inventario</h2>
            <p>Herramientas diseñadas para cualquier tipo de producto y cualquier tamaño de negocio.</p>
          </div>
          <div className="services-grid">
            {[
              ["📦","Control de Stock","Registra entradas y salidas de cualquier producto con precisión. Consulta el estado de tu inventario en tiempo real desde cualquier dispositivo."],
              ["🔔","Alertas Inteligentes","Recibe notificaciones automáticas cuando un producto esté por agotarse. Nunca más pierdas una venta por falta de stock."],
              ["📊","Reportes y Analítica","Dashboards en tiempo real con datos de ventas, rotación de productos y tendencias para tomar decisiones inteligentes."],
              ["🚚","Gestión de Proveedores","Administra tus proveedores, genera órdenes de compra y realiza seguimiento de entregas desde un solo lugar."],
              ["🏪","Multi-bodega","Gestiona el inventario de múltiples bodegas, tiendas o puntos de venta de forma centralizada y sincronizada."],
              ["🔗","Integraciones","Conecta Inventa con tu tienda online, sistema de facturación electrónica y herramientas de venta que ya usas."],
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
            <p>Escríbenos y uno de nuestros asesores colombianos te contactará en menos de 24 horas.</p>
            {[["📧","hola@inventa.com.co"],["📞","+57 (315) 859-4567"],["📍","Colombia"],["🕐","Lunes – Viernes, 8am – 6pm COT"]].map(([i,t]) => (
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
            <div className="form-group"><label>Correo electrónico</label><input type="email" placeholder="correo@empresa.com" /></div>
            <div className="form-group"><label>Teléfono (opcional)</label><input type="tel" placeholder="+57 300 000 0000" /></div>
            <div className="form-group">
              <label>¿Cómo podemos ayudarte?</label>
              <textarea placeholder="Cuéntanos sobre tu negocio..." />
            </div>
            <button className="btn-submit" onClick={() => showToast("¡Mensaje enviado!", "Te contactaremos pronto desde Colombia.")}>
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
        <div className="footer-copy">© 2025 Inventa — Colombia. Todos los derechos reservados.</div>
        <div className="footer-links">
          <a href="#">Privacidad</a>
          <a href="#">Términos</a>
          <a href="#contact" onClick={e => { e.preventDefault(); scrollTo("contact"); }}>Contacto</a>
        </div>
      </footer>

    </div>
  );
}

   