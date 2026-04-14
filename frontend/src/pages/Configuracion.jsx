// src/pages/Configuracion.jsx
import { useState } from "react";

function Configuracion() {
  const [empresa, setEmpresa] = useState("");
  const [correo, setCorreo]   = useState("");

  function handleGuardar() {
    alert(`Guardado:\nEmpresa: ${empresa}\nCorreo: ${correo}`);
    // Aquí harías fetch a tu API Spring Boot:
    // fetch("http://localhost:8080/api/configuracion", { method: "POST", body: ... })
  }

  return (
    <>
      <h1>Configuración</h1>
      <input
        type="text"
        placeholder="Nombre Empresa"
        value={empresa}
        onChange={(e) => setEmpresa(e.target.value)}
      />
      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />
      <button className="btn" onClick={handleGuardar}>
        Guardar Cambios
      </button>
    </>
  );
}

export default Configuracion;
