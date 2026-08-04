import React, { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { crearVenta } from "../services/api";

export default function Facturacion() {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);
  const [inputsCantidad, setInputsCantidad] = useState({});

  // --- ESTADOS PARA CLIENTE ---
  const [esClienteGeneral, setEsClienteGeneral] = useState(true);
  const [clienteForm, setClienteForm] = useState({
    nombre: '',
    cedula: '',
    telefono: '',
    correo: '',
    direccion: ''
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/productos")
      .then(res => {
        if (!res.ok) throw new Error("Error " + res.status + ": El servidor rechazó la conexión.");
        return res.json();
      })
      .then(data => {
        setProductos(data);
        const inicial = {};
        data.forEach(p => inicial[p.idProducto] = 1);
        setInputsCantidad(inicial);
        setErrorStatus(null);
      })
      .catch(err => setErrorStatus(err.message));
  }, []);

  const handleInputChange = (id, valor) => {
    setInputsCantidad({ ...inputsCantidad, [id]: valor });
  };

  const handleClienteChange = (e) => {
    setClienteForm({ ...clienteForm, [e.target.name]: e.target.value });
  };

  const agregarAlCarrito = (prod) => {
    const cant = parseInt(inputsCantidad[prod.idProducto]);
    if (isNaN(cant) || cant <= 0) return alert("Cantidad inválida");
    if (cant > prod.stock) return alert("Stock insuficiente");

    const existe = carrito.find(item => item.idProducto === prod.idProducto);
    if (existe) {
      setCarrito(carrito.map(item =>
        item.idProducto === prod.idProducto ? { ...item, cantidad: item.cantidad + cant } : item
      ));
    } else {
      setCarrito([...carrito, { 
        idProducto: prod.idProducto, 
        nombre: prod.nombre, 
        precio: prod.precioVenta, 
        cantidad: cant 
      }]);
    }
    handleInputChange(prod.idProducto, 1);
  };

  const confirmarVenta = async () => {
    if (carrito.length === 0) return alert("El carrito está vacío");

    // Construcción del Payload
    const ventaData = {
      idUsuario: usuario?.idUsuario || 2, // Toma el ID del usuario logueado o 2 por defecto
      detalles: carrito.map(item => ({
        idProducto: item.idProducto,
        cantidad: item.cantidad
      }))
    };

    // Si NO es cliente general, enviamos los datos del cliente
    if (!esClienteGeneral) {
      if (!clienteForm.nombre.trim()) {
        return alert("Por favor ingresa al menos el nombre del cliente.");
      }
      ventaData.nuevoCliente = clienteForm;
    }

    try {
      setLoading(true);
      await crearVenta(ventaData);
      alert("¡Venta confirmada!");
      setCarrito([]);
      
      // Limpiar formulario de cliente
      setClienteForm({ nombre: '', cedula: '', telefono: '', correo: '', direccion: '' });
      setEsClienteGeneral(true);

      navigate("/app/ordenes");
    } catch (err) {
      alert("Error al procesar la venta en el servidor: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const total = carrito.reduce((acc, i) => acc + (i.precio * i.cantidad), 0) * 1.19;

  return (
    <div style={{ padding: '30px', color: '#f8fafc', backgroundColor: '#0f172a', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Módulo de Ventas</h1>
      
      {errorStatus && (
        <div style={{ background: '#ef4444', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          <strong>Atención:</strong> {errorStatus}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '30px' }}>
        
        {/* TABLA DE INVENTARIO */}
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
          <h2>Inventario</h2>
          {productos.map(p => (
            <div key={p.idProducto} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', borderBottom: '1px solid #334155' }}>
              <div>
                <strong>{p.nombre}</strong>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Stock: {p.stock} | ${p.precioVenta}</div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="number" 
                  value={inputsCantidad[p.idProducto] || ""} 
                  onChange={(e) => handleInputChange(p.idProducto, e.target.value)} 
                  style={{ width: '60px', textAlign: 'center', borderRadius: '4px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff' }} 
                />
                <button 
                  onClick={() => agregarAlCarrito(p)} 
                  style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Añadir
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* MÓDULO FACTURA Y CLIENTE */}
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
          <h2>Factura Actual</h2>

          {/* SECCIÓN DATOS DEL CLIENTE */}
          <div style={{ background: '#0f172a', padding: '15px', borderRadius: '8px', margin: '15px 0', border: '1px solid #334155' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
              <input 
                type="checkbox" 
                checked={esClienteGeneral} 
                onChange={(e) => setEsClienteGeneral(e.target.checked)} 
              />
              Venta a "Estimado Cliente" (Cliente General)
            </label>

            {!esClienteGeneral && (
              <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input 
                  type="text" 
                  name="nombre" 
                  placeholder="Nombre completo *" 
                  value={clienteForm.nombre} 
                  onChange={handleClienteChange}
                  style={inputStyle} 
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <input 
                    type="text" 
                    name="cedula" 
                    placeholder="Cédula / NIT" 
                    value={clienteForm.cedula} 
                    onChange={handleClienteChange}
                    style={inputStyle} 
                  />
                  <input 
                    type="text" 
                    name="telefono" 
                    placeholder="Teléfono" 
                    value={clienteForm.telefono} 
                    onChange={handleClienteChange}
                    style={inputStyle} 
                  />
                </div>
                <input 
                  type="email" 
                  name="correo" 
                  placeholder="Correo electrónico" 
                  value={clienteForm.correo} 
                  onChange={handleClienteChange}
                  style={inputStyle} 
                />
                <input 
                  type="text" 
                  name="direccion" 
                  placeholder="Dirección" 
                  value={clienteForm.direccion} 
                  onChange={handleClienteChange}
                  style={inputStyle} 
                />
              </div>
            )}
          </div>

          {/* ITEMS EN CARRITO */}
          {carrito.length === 0 ? (
            <p style={{ color: '#94a3b8', textAlign: 'center', margin: '20px 0' }}>El carrito está vacío</p>
          ) : (
            carrito.map(item => (
              <div key={item.idProducto} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #334155' }}>
                <span>{item.nombre} x {item.cantidad}</span>
                <span>${(item.precio * item.cantidad).toLocaleString()}</span>
              </div>
            ))
          )}

          {/* TOTALES Y BOTÓN DE CONFIRMACIÓN */}
          <div style={{ marginTop: '20px', borderTop: '2px solid #334155', paddingTop: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 'bold', color: '#4ade80' }}>
              <span>TOTAL (IVA incl.):</span>
              <span>${total.toLocaleString()}</span>
            </div>
            <button 
              onClick={confirmarVenta}
              disabled={loading}
              style={{ width: '100%', marginTop: '20px', padding: '15px', background: loading ? '#64748b' : '#22c55e', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {loading ? "PROCESANDO..." : "CONFIRMAR VENTA"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: '8px 12px',
  borderRadius: '6px',
  border: '1px solid #475569',
  backgroundColor: '#1e293b',
  color: '#ffffff',
  outline: 'none'
};