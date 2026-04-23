import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

export default function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isLogin, setIsLogin] = useState(searchParams.get("mode") !== "register");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLogin(searchParams.get("mode") !== "register");
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/registro";
    const payload = isLogin 
      ? { username, password } 
      : { username, password, nombre, email };

    try {
      const response = await fetch(`http://localhost:8080${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          login(data);
          navigate("/app/dashboard");
        } else {
          alert("¡Registro exitoso! Ya puedes iniciar sesión.");
          setIsLogin(true);
        }
      } else {
        setError(data.error || "Ocurrió un error en la operación");
      }
    } catch (err) {
      setError("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <h1>INVENTA</h1>
          <p>{isLogin ? "Inicia sesión para gestionar tu inventario" : "Crea tu cuenta de administrador"}</p>
        </div>

        {error && <div className="login-error">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="field">
                <label>Nombre Completo</label>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required={!isLogin} />
              </div>
              <div className="field">
                <label>Correo Electrónico</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required={!isLogin} />
              </div>
            </>
          )}

          <div className="field">
            <label>Usuario</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>

          <div className="field">
            <label>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <button type="submit" className="login-btn">
            {isLogin ? "Ingresar →" : "Registrarse →"}
          </button>
        </form>

        <div className="login-footer-links">
          <button className="link-btn" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
          </button>

          {/* NUEVO ENLACE DE RECUPERACIÓN */}
          {isLogin && (
            <button className="link-btn forgot-btn" onClick={() => navigate("/forgot-password")}>
              ¿Olvidaste tu contraseña?
            </button>
          )}

          <button className="link-btn back" onClick={() => navigate("/")}>
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}