import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { login as apiLogin } from "../services/api";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Llamada a tu API real
      const data = await apiLogin(username, password);
      
      if (data?.error) {
        setError(data.error);
        return;
      }

      // 2. Guardamos en el AuthContext
      login(data);

      // 3. LA CORRECCIÓN CLAVE: 
      // Tu App.jsx tiene el Dashboard en "/app/dashboard"
      navigate("/app/dashboard"); 

    } catch (err) {
      setError("No se pudo conectar con el servidor");
      console.error("Error en login:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <h1>📦 INVENTA</h1>
          <p>Gestión de Inventario — Colombia</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}
          
          <div className="field">
            <label>Usuario</label>
            <input 
              type="text" 
              placeholder="admin" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              required 
            />
          </div>

          <div className="field">
            <label>Contraseña</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "INGRESANDO..." : "INICIAR SESIÓN"}
          </button>
        </form>

        <div className="login-footer-links">
          <button 
            onClick={() => navigate('/restablecer')} 
            className="link-btn"
          >
            ¿Olvidaste tu contraseña?
          </button>
          <button 
            onClick={() => navigate('/')} 
            className="link-btn back"
          >
            ← Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}