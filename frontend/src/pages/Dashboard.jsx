import { useState, useEffect } from "react";
import { getProductos, getVentas, getProveedores } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [stats, setStats] = useState({ productos:0, ventas:"$0", proveedores:0, stockBajo:0 });
  const { usuario } = useAuth();

  useEffect(() => {
    Promise.all([getProductos(), getVentas(), getProveedores()])
      .then(([prods, ventas, provs]) => {
        const totalVentas = (ventas||[]).reduce((s,v) => s + Number(v.total||0), 0);
        const stockBajo   = (prods||[]).filter(p => p.stock <= 10).length;
        setStats({
          productos:  (prods||[]).length,
          ventas:     "$" + totalVentas.toLocaleString("es-CO"),
          proveedores:(provs||[]).length,
          stockBajo,
        });
      }).catch(()=>{});
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <p style={{color:"#888", marginBottom:24}}>Bienvenido, <strong>{usuario?.nombre}</strong> — Rol: {usuario?.rol}</p>
      <div className="cards">
        {[
          { label:"Total Productos",  valor: stats.productos,   color:"#1e90ff" },
          { label:"Total Ventas",     valor: stats.ventas,      color:"#2ecc71" },
          { label:"Proveedores",      valor: stats.proveedores, color:"#9b59b6" },
          { label:"Stock Bajo / Agotado", valor: stats.stockBajo, color:"#e74c3c" },
        ].map(c => (
          <div className="card" key={c.label} style={{borderLeftColor: c.color}}>
            <h3>{c.label}</h3>
            <p style={{color: c.color}}>{c.valor}</p>
          </div>
        ))}
      </div>
    </>
  );
}
