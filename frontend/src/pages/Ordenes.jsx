import { useState, useEffect } from "react";
import { getVentas } from "../services/api";

export default function Ordenes() {
  const [ventas,   setVentas]   = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(()=>{
    getVentas().then(d=>setVentas(d||[])).finally(()=>setCargando(false));
  },[]);

  return (
    <>
      <h1>Órdenes / Ventas</h1>
      {cargando ? <p>Cargando...</p> : (
        <table>
          <thead><tr><th>#</th><th>Fecha</th><th>Cliente</th><th>Usuario</th><th>Total</th></tr></thead>
          <tbody>
            {ventas.length===0 && <tr><td colSpan={5} style={{textAlign:"center",padding:24,color:"#888"}}>Sin ventas registradas</td></tr>}
            {ventas.map(v=>(
              <tr key={v.idVenta}>
                <td>#{v.idVenta}</td>
                <td>{v.fechaVenta ? new Date(v.fechaVenta).toLocaleDateString("es-CO") : "-"}</td>
                <td>{v.cliente?.nombre || "-"}</td>
                <td>{v.usuario?.nombre || "-"}</td>
                <td>${Number(v.total).toLocaleString("es-CO")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
