import React, { useState, useEffect } from 'react';

export default function Ordenes() {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/ventas")
      .then((res) => {
        if (!res.ok) throw new Error("Error en la conexión con el servidor");
        return res.json();
      })
      .then((data) => {
        setOrdenes(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar órdenes:", err);
        setLoading(false);
      });
  }, []);

  // Función para formatear fechas en cualquier estructura recibida
  const formatearFecha = (fechaRaw) => {
    if (!fechaRaw) return 'Sin fecha';

    // Si viene en formato Array desde Jackson [año, mes, día, hora, minuto]
    if (Array.isArray(fechaRaw)) {
      const [year, month, day, hour = 0, minute = 0] = fechaRaw;
      const fechaObj = new Date(year, month - 1, day, hour, minute);
      return fechaObj.toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' });
    }

    // Si viene como String ISO (ej: "2026-08-03T19:50:00")
    const fechaObj = new Date(fechaRaw);
    if (!isNaN(fechaObj.getTime())) {
      return fechaObj.toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' });
    }

    return String(fechaRaw);
  };

  const verFactura = (id) => {
    alert(`Visualizando detalles de la Factura #${id}`);
  };

  if (loading) {
    return (
      <div style={{ padding: '30px', color: '#f8fafc', backgroundColor: '#0f172a', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        <h2>Cargando historial de órdenes...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', color: '#f8fafc', backgroundColor: '#0f172a', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Historial de Órdenes</h1>

      <div style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #334155', color: '#94a3b8' }}>
              <th style={{ padding: '12px' }}>ID Factura</th>
              <th style={{ padding: '12px' }}>Fecha y Hora</th>
              <th style={{ padding: '12px' }}>Total</th>
              <th style={{ padding: '12px' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#94a3b8' }}>
                  No hay ventas registradas aún.
                </td>
              </tr>
            ) : (
              ordenes.map((venta) => {
                const idNum = venta.idVenta || venta.id;
                const idFormateado = idNum ? `#${String(idNum).padStart(4, '0')}` : '#0000';
                const fechaFinal = formatearFecha(venta.fechaVenta || venta.fecha);

                return (
                  <tr key={idNum || Math.random()} style={{ borderBottom: '1px solid #334155' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold', color: '#60a5fa' }}>
                      {idFormateado}
                    </td>
                    <td style={{ padding: '12px' }}>
                      {fechaFinal}
                    </td>
                    <td style={{ padding: '12px', fontWeight: 'bold', color: '#4ade80' }}>
                      ${Number(venta.total || 0).toLocaleString()}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <button 
                        onClick={() => verFactura(idNum)}
                        style={{
                          background: '#3b82f6',
                          color: '#ffffff',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Ver Factura
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}