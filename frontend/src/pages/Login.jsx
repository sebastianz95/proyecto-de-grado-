import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { login as apiLogin } from "../services/api";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const { login }  = useAuth();
  const navigate   = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      const data = await apiLogin(username, password);
      if (data?.error) { setError(data.error); return; }
      login(data); navigate("/dashboard");
    } catch { setError("No se pudo conectar con el servidor"); }
    finally { setLoading(false); }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo"><h1>📦 Inventa</h1><p>Gestión de Inventario</p></div>
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}
          <div className="field"><label>Usuario</label>
            <input type="text" placeholder="admin" value={username} onChange={e=>setUsername(e.target.value)} required /></div>
          <div className="field"><label>Contraseña</label>
            <input type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} required /></div>
          <button type="submit" className="login-btn" disabled={loading}>{loading?"Ingresando...":"Iniciar Sesión"}</button>
        </form>
        <p className="login-back"><a href="/">← Volver al inicio</a></p>
      </div>
    </div>
  );
}
