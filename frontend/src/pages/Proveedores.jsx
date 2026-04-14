import { useState, useEffect } from "react";
import { getProveedores, crearProveedor, borrarProveedor } from "../services/api";

const EMPTY = { nombre:"", telefono:"", correo:"", direccion:"" };

export default function Proveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [modal, setModal] = useState(false);
  const [form,  setForm]  = useState(EMPTY);
  const [cargando, setCargando] = useState(true);

  useEffect(()=>{ cargar(); },[]);
  async function cargar() { setCargando(true); const d=await getProveedores(); setProveedores(d||[]); setCargando(false); }
  async function guardar(e) { e.preventDefault(); await crearProveedor(form); setModal(false); cargar(); }
  async function eliminar(id) { if(!window.confirm("¿Eliminar?")) return; await borrarProveedor(id); cargar(); }

  return (
    <>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h1>Proveedores</h1>
        <button className="btn" onClick={()=>{setForm(EMPTY);setModal(true)}}>+ Nuevo Proveedor</button>
      </div>
      {cargando ? <p>Cargando...</p> : (
        <div className="supplier-grid">
          {proveedores.length===0 && <p style={{color:"#888"}}>Sin proveedores</p>}
          {proveedores.map(p=>(
            <div className="supplier-card" key={p.idProveedor}>
              <h3>{p.nombre}</h3>
              {p.telefono && <p>📞 {p.telefono}</p>}
              {p.correo   && <p>📧 {p.correo}</p>}
              {p.direccion && <p>📍 {p.direccion}</p>}
              <button className="btn" style={{background:"#e74c3c",marginTop:10,marginBottom:0}} onClick={()=>eliminar(p.idProveedor)}>Eliminar</button>
            </div>
          ))}
        </div>
      )}
      {modal && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999}}>
          <div style={{background:"white",borderRadius:12,padding:32,width:420}}>
            <h2 style={{marginBottom:20,color:"#1b3c59"}}>Nuevo Proveedor</h2>
            <form onSubmit={guardar}>
              {[["nombre","Nombre *"],["telefono","Teléfono"],["correo","Correo"],["direccion","Dirección"]].map(([k,l])=>(
                <div key={k} style={{marginBottom:12}}>
                  <label style={{display:"block",fontSize:12,color:"#666",marginBottom:4}}>{l}</label>
                  <input type="text" value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} required={k==="nombre"}
                    style={{width:"100%",padding:"8px 12px",borderRadius:8,border:"1px solid #ccc"}} />
                </div>
              ))}
              <div style={{display:"flex",gap:10,marginTop:8}}>
                <button type="submit" className="btn" style={{flex:1,marginBottom:0}}>Guardar</button>
                <button type="button" onClick={()=>setModal(false)} style={{flex:1,padding:"8px 16px",borderRadius:8,border:"1px solid #ccc",background:"white",cursor:"pointer"}}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
