const BASE = "http://localhost:8080/api";

function headers() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function req(method, url, body) {
  const res = await fetch(`${BASE}${url}`, {
    method,
    headers: headers(),
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401) {
    localStorage.clear();
    window.location.href = "/login";
    return;
  }

  // Si la respuesta es exitosa pero no tiene contenido (como un DELETE)
  if (res.status === 204 || method === "DELETE") return { mensaje: "OK" };

  return res.json();
}

export const login = (u, p) =>
  req("POST", "/auth/login", { username: u, password: p });
export const getProductos = () => req("GET", "/productos");
export const crearProducto = (d) => req("POST", "/productos", d);
export const editarProducto = (id, d) => req("PUT", `/productos/${id}`, d);
export const borrarProducto = (id) => req("DELETE", `/productos/${id}`);
export const getClientes = () => req("GET", "/clientes");
export const crearCliente = (d) => req("POST", "/clientes", d);
export const borrarCliente = (id) => req("DELETE", `/clientes/${id}`);

// CORRECCIÓN AQUÍ: de "/proveedors" a "/proveedores"
export const getProveedores = () => req("GET", "/proveedores");
export const crearProveedor = (d) => req("POST", "/proveedores", d);
export const borrarProveedor = (id) => req("DELETE", `/proveedores/${id}`);

export const getCategorias = () => req("GET", "/categorias");
export const getVentas = () => req("GET", "/ventas");
export const crearVenta = (d) => req("POST", "/ventas", d);
