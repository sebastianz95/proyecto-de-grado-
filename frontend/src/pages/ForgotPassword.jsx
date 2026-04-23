import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; 

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    // Aquí irá la llamada a tu API de Java en el futuro
    alert("Si el correo " + email + " está registrado, recibirás un enlace de recuperación pronto.");
    navigate("/login");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <h1>INVENTA</h1>
          <h3>Recuperar cuenta</h3>
          <p>Ingresa tu correo electrónico para restablecer tu acceso.</p>
        </div>
        
        <form className="login-form" onSubmit={handleReset}>
          <div className="field">
            <label>Correo Electrónico</label>
            <input 
              type="email" 
              placeholder="ejemplo@correo.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="login-btn">Enviar enlace de recuperación</button>
        </form>

        <div className="login-footer-links">
          <button className="link-btn" onClick={() => navigate("/login")}>
            ← Volver al inicio de sesión
          </button>
        </div>
      </div>
    </div>
  );
}