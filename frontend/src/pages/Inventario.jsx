import { useState, useEffect } from "react";
import { 
  getProductos, 
  crearProducto, 
  editarProducto, 
  borrarProducto, 
  getCategorias, 
  getProveedores 
} from "../services/api";

const EMPTY = { 
  nombre: "", 
  descripcion: "", 
  precioCompra: "", 
  precioVenta: "", 
  stock: "", 
  idCategoria: "", 
  idProveedor: "", 
  tasaIva: "0.19" 
};

export default function Inventario() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarTodo();
  }, []);

  async function cargarTodo() {
    setCargando(true);
    try {
      const [resP, resC, resProv] = await Promise.all([
        getProductos(), 
        getCategorias(), 
        getProveedores()
      ]);
      setProductos(Array.isArray(resP) ? resP : []);
      setCategorias(Array.isArray(resC) ? resC : []);
      setProveedores(Array.isArray(resProv) ? resProv : []);
    } catch (e) {
      console.error("Error al cargar datos:", e);
    } finally {
      setCargando(false);
    }
  }

  // --- FUNCIONES DE FORMATEO COP ---
  const formatCOP = (val) => {
    if (!val) return "";
    // Elimina todo lo que no sea número
    const text = val.toString().replace(/\D/g, "");
    if (!text) return "";
    // Formatea con puntos de miles
    return "$ " + text.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const deformatCOP = (val) => {
    if (!val) return "";
    // Quita el símbolo $ y los puntos para volverlo un número puro
    return val.toString().replace(/\D/g, "");
  };

  function abrirCrear() {
    setForm(EMPTY);
    setEditId(null);
    setModal(true);
  }

  function abrirEditar(p) {
    setForm({
      nombre: p.nombre || "",
      descripcion: p.descripcion || "",
      precioCompra: p.precioCompra || "",
      precioVenta: p.precioVenta || "",
      stock: p.stock || "",
      tasaIva: p.tasaIva ? p.tasaIva.toString() : "0.19",
      idCategoria: p.idCategoria || "",
      idProveedor: p.idProveedor || ""
    });
    setEditId(p.idProducto);
    setModal(true);
  }

  async function guardar(e) {
    e.preventDefault();
    const data = { 
      ...form, 
      stock: Number(form.stock), 
      // Nos aseguramos de enviar solo números al backend
      precioCompra: Number(deformatCOP(form.precioCompra)), 
      precioVenta: Number(deformatCOP(form.precioVenta)), 
      tasaIva: Number(form.tasaIva),
      idCategoria: Number(form.idCategoria),
      idProveedor: Number(form.idProveedor)
    };

    try {
      if (editId) {
        await editarProducto(editId, data);
      } else {
        await crearProducto(data);
      }
      setModal(false);
      cargarTodo();
    } catch (e) {
      alert("Error al guardar el producto");
    }
  }

  async function eliminar(id) {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await borrarProducto(id);
        cargarTodo();
      } catch (e) {
        alert("Error al eliminar");
      }
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
    display: "block"
  };

  if (cargando) return <div style={{ padding: "20px" }}>Cargando inventario...</div>;

  return (
    <div style={{ padding: "30px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1 style={{ margin: 0, color: "#2c3e50" }}>Gestión de Inventario</h1>
        <button 
          onClick={abrirCrear}
          style={{ padding: "10px 20px", backgroundColor: "#27ae60", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}
        >
          + Nuevo Producto
        </button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
        <thead>
          <tr style={{ backgroundColor: "#34495e", color: "white" }}>
            <th style={{ padding: "12px", textAlign: "left" }}>Producto</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Categoría</th>
            <th style={{ padding: "12px", textAlign: "center" }}>IVA</th>
            <th style={{ padding: "12px", textAlign: "right" }}>Precio Venta</th>
            <th style={{ padding: "12px", textAlign: "center" }}>Stock</th>
            <th style={{ padding: "12px", textAlign: "center" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.idProducto} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "12px" }}>
                <strong>{p.nombre}</strong><br />
                <small style={{ color: "#7f8c8d" }}>{p.descripcion}</small>
              </td>
              <td style={{ padding: "12px" }}>{p.categoria || "N/A"}</td>
              <td style={{ padding: "12px", textAlign: "center" }}>{(Number(p.tasaIva) * 100).toFixed(0)}%</td>
              <td style={{ padding: "12px", textAlign: "right" }}>{formatCOP(p.precioVenta)}</td>
              <td style={{ padding: "12px", textAlign: "center" }}>{p.stock}</td>
              <td style={{ padding: "12px", textAlign: "center" }}>
                <button onClick={() => abrirEditar(p)} style={{ marginRight: "8px", cursor: "pointer", border: "none", background: "none", fontSize: "18px" }}>✏️</button>
                <button onClick={() => eliminar(p.idProducto)} style={{ cursor: "pointer", border: "none", background: "none", fontSize: "18px" }}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "10px", width: "450px", maxHeight: "90vh", overflowY: "auto" }}>
            <h2 style={{ marginTop: 0 }}>{editId ? "Editar Producto" : "Nuevo Producto"}</h2>
            <form onSubmit={guardar}>
              <label style={{ fontSize: "12px", fontWeight: "bold" }}>Nombre del Producto</label>
              <input style={inputStyle} value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required />
              
              <label style={{ fontSize: "12px", fontWeight: "bold" }}>Descripción</label>
              <input style={inputStyle} value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} />
              
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "12px", fontWeight: "bold" }}>Precio Compra</label>
                  <input 
                    type="text" 
                    style={inputStyle} 
                    value={formatCOP(form.precioCompra)} 
                    onChange={e => setForm({...form, precioCompra: deformatCOP(e.target.value)})} 
                    placeholder="$ 0"
                    required 
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "12px", fontWeight: "bold" }}>Precio Venta</label>
                  <input 
                    type="text" 
                    style={inputStyle} 
                    value={formatCOP(form.precioVenta)} 
                    onChange={e => setForm({...form, precioVenta: deformatCOP(e.target.value)})} 
                    placeholder="$ 0"
                    required 
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "12px", fontWeight: "bold" }}>Stock Inicial</label>
                  <input type="number" style={inputStyle} value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} required />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "12px", fontWeight: "bold" }}>Tasa IVA (ej: 0.19)</label>
                  <input type="number" step="0.01" style={inputStyle} value={form.tasaIva} onChange={e => setForm({...form, tasaIva: e.target.value})} required />
                </div>
              </div>

              <label style={{ fontSize: "12px", fontWeight: "bold" }}>Categoría</label>
              <select style={inputStyle} value={form.idCategoria} onChange={e => setForm({...form, idCategoria: e.target.value})} required>
                <option value="">Seleccione Categoría</option>
                {categorias.map(c => <option key={c.idCategoria} value={c.idCategoria}>{c.nombre}</option>)}
              </select>

              <label style={{ fontSize: "12px", fontWeight: "bold" }}>Proveedor</label>
              <select style={inputStyle} value={form.idProveedor} onChange={e => setForm({...form, idProveedor: e.target.value})} required>
                <option value="">Seleccione Proveedor</option>
                {proveedores.map(prov => <option key={prov.idProveedor} value={prov.idProveedor}>{prov.nombre}</option>)}
              </select>

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button type="submit" style={{ flex: 1, padding: "12px", backgroundColor: "#3498db", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>
                  {editId ? "Actualizar" : "Guardar"}
                </button>
                <button type="button" onClick={() => setModal(false)} style={{ flex: 1, padding: "12px", backgroundColor: "#95a5a6", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}