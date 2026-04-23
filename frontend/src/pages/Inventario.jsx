import { useState, useEffect } from "react";
import { getProductos, crearProducto, editarProducto, borrarProducto, getCategorias, getProveedores } from "../services/api";

const EMPTY = { nombre:"", descripcion:"", precioCompra:"", precioVenta:"", stock:"", idCategoria:"", idProveedor:"" };

export default function Inventario() {
  const [productos,   setProductos]   = useState([]);
  const [categorias,  setCategorias]  = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [modal,       setModal]       = useState(false);
  const [form,        setForm]        = useState(EMPTY);
  const [editId,      setEditId]      = useState(null);
  const [buscar,      setBuscar]      = useState("");
  const [cargando,    setCargando]    = useState(true);
  const [error,       setError]       = useState("");

  useEffect(() => { cargarTodo(); }, []);

  async function cargarTodo() {
    setCargando(true);
    try {
      const [p, c, prov] = await Promise.all([getProductos(), getCategorias(), getProveedores()]);
      setProductos(p||[]); setCategorias(c||[]); setProveedores(prov||[]);
    } catch { setError("Error al cargar datos"); }
    finally { setCargando(false); }
  }

  function abrirCrear() { setForm(EMPTY); setEditId(null); setModal(true); }
  function abrirEditar(p) {
    setForm({ nombre:p.nombre, descripcion:p.descripcion, precioCompra:p.precioCompra,
      precioVenta:p.precioVenta, stock:p.stock, idCategoria:p.idCategoria||"", idProveedor:p.idProveedor||"" });
    setEditId(p.idProducto); setModal(true);
  }

  async function guardar(e) {
    e.preventDefault();
    const data = { ...form, stock:Number(form.stock), precioCompra:Number(form.precioCompra),
      precioVenta:Number(form.precioVenta), idCategoria:Number(form.idCategoria), idProveedor:Number(form.idProveedor) };
    editId ? await editarProducto(editId, data) : await crearProducto(data);
    setModal(false); cargarTodo();
  }

  async function eliminar(id) {
    if (!window.confirm("¿Eliminar este producto?")) return;
    await borrarProducto(id); cargarTodo();
  }

  const filtrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(buscar.toLowerCase()) ||
    (p.categoria||"").toLowerCase().includes(buscar.toLowerCase())
  );

  const badge = (s) => s === 0 ? <span className="status cancel">Agotado</span>
    : s <= 10 ? <span className="status pending">Bajo</span>
    : <span className="status ok">OK</span>;

  return (
    <>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h1>Inventario</h1>
        <button className="btn" onClick={abrirCrear}>+ Agregar Producto</button>
      </div>
      <input type="text" placeholder="🔍 Buscar..." value={buscar} onChange={e=>setBuscar(e.target.value)}
        style={{padding:"8px 14px",borderRadius:8,border:"1px solid #ccc",width:300,marginBottom:16}} />
      {error && <p style={{color:"red"}}>{error}</p>}
      {cargando ? <p>Cargando...</p> : (
        <table>
          <thead><tr><th>#</th><th>Producto</th><th>Categoría</th><th>Proveedor</th><th>P.Compra</th><th>P.Venta</th><th>Stock</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            {filtrados.length === 0 && <tr><td colSpan={9} style={{textAlign:"center",padding:24,color:"#888"}}>Sin productos</td></tr>}
            {filtrados.map(p => (
              <tr key={p.idProducto}>
                <td>{p.idProducto}</td>
                <td><strong>{p.nombre}</strong><br/><small style={{color:"#888"}}>{p.descripcion}</small></td>
                <td>{p.categoria}</td><td>{p.proveedor}</td>
                <td>${Number(p.precioCompra).toLocaleString("es-CO")}</td>
                <td>${Number(p.precioVenta).toLocaleString("es-CO")}</td>
                <td>{p.stock}</td><td>{badge(p.stock)}</td>
                <td>
                  <button className="btn" style={{marginBottom:0,marginRight:6,padding:"4px 10px",fontSize:12}} onClick={()=>abrirEditar(p)}>✏️</button>
                  <button className="btn" style={{marginBottom:0,background:"#e74c3c",padding:"4px 10px",fontSize:12}} onClick={()=>eliminar(p.idProducto)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {modal && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999}}>
          <div style={{background:"white",borderRadius:12,padding:32,width:480,maxHeight:"90vh",overflowY:"auto"}}>
            <h2 style={{marginBottom:20,color:"#1b3c59"}}>{editId?"Editar":"Nuevo Producto"}</h2>
            <form onSubmit={guardar}>
              {[["nombre","Nombre","text"],["descripcion","Descripción","text"],["precioCompra","Precio Compra","number"],["precioVenta","Precio Venta","number"],["stock","Stock","number"]].map(([k,l,t])=>(
                <div key={k} style={{marginBottom:12}}>
                  <label style={{display:"block",fontSize:12,color:"#666",marginBottom:4}}>{l}</label>
                  <input type={t} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})}
                    required={["nombre","precioCompra","precioVenta","stock"].includes(k)}
                    style={{width:"100%",padding:"8px 12px",borderRadius:8,border:"1px solid #ccc"}} />
                </div>
              ))}
              <div style={{marginBottom:12}}>
                <label style={{display:"block",fontSize:12,color:"#666",marginBottom:4}}>Categoría</label>
                <select value={form.idCategoria} onChange={e=>setForm({...form,idCategoria:e.target.value})} required
                  style={{width:"100%",padding:"8px 12px",borderRadius:8,border:"1px solid #ccc"}}>
                  <option value="">-- Seleccionar --</option>
                  {categorias.map(c=><option key={c.idCategoria} value={c.idCategoria}>{c.nombre}</option>)}
                </select>
              </div>
              <div style={{marginBottom:20}}>
                <label style={{display:"block",fontSize:12,color:"#666",marginBottom:4}}>Proveedor</label>
                <select value={form.idProveedor} onChange={e=>setForm({...form,idProveedor:e.target.value})} required
                  style={{width:"100%",padding:"8px 12px",borderRadius:8,border:"1px solid #ccc"}}>
                  <option value="">-- Seleccionar --</option>
                  {proveedores.map(p=><option key={p.idProveedor} value={p.idProveedor}>{p.nombre}</option>)}
                </select>
              </div>
              <div style={{display:"flex",gap:10}}>
                <button type="submit" className="btn" style={{flex:1,marginBottom:0}}>{editId?"Guardar":"Crear"}</button>
                <button type="button" onClick={()=>setModal(false)}
                  style={{flex:1,padding:"8px 16px",borderRadius:8,border:"1px solid #ccc",background:"white",cursor:"pointer"}}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
