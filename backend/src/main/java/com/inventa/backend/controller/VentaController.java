package com.inventa.backend.controller;

import com.inventa.backend.model.*;
import com.inventa.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/ventas")
@CrossOrigin(origins = "*")
public class VentaController {

    @Autowired
    private VentaRepository ventaRepo;

    @Autowired
    private DetalleVentaRepository detalleVentaRepo;

    @Autowired
    private ProductoRepository productoRepo;

    @Autowired
    private ClienteRepository clienteRepo;

    @Autowired
    private UsuarioRepository usuarioRepo;

    @GetMapping
    public List<Venta> listarTodas() {
        return ventaRepo.findAll();
    }

    @PostMapping
    @SuppressWarnings("unchecked")
    public ResponseEntity<?> crear(@RequestBody Map<String, Object> body) {
        try {
            if (body == null || !body.containsKey("detalles")) {
                return ResponseEntity.badRequest().body(Map.of("error", "El campo 'detalles' es obligatorio."));
            }

            Venta venta = new Venta();
            venta.setFechaVenta(LocalDateTime.now());

            // --- GESTIÓN DE CLIENTE ---
            Cliente clienteParaVenta = null;

            if (body.get("nuevoCliente") != null) {
                Map<String, Object> datosCliente = (Map<String, Object>) body.get("nuevoCliente");

                Cliente nuevo = new Cliente();
                nuevo.setNombre(datosCliente.getOrDefault("nombre", "Estimado Cliente").toString());
                nuevo.setCedula(datosCliente.get("cedula") != null ? datosCliente.get("cedula").toString() : null);
                nuevo.setTelefono(
                        datosCliente.get("telefono") != null ? datosCliente.get("telefono").toString() : null);
                nuevo.setCorreo(datosCliente.get("correo") != null ? datosCliente.get("correo").toString() : null);
                nuevo.setDireccion(
                        datosCliente.get("direccion") != null ? datosCliente.get("direccion").toString() : null);

                clienteParaVenta = clienteRepo.save(nuevo);
            } else if (body.get("idCliente") != null && !body.get("idCliente").toString().trim().isEmpty()) {
                Integer idCli = Integer.parseInt(body.get("idCliente").toString());
                clienteParaVenta = clienteRepo.findById(idCli).orElse(null);
            }

            if (clienteParaVenta == null) {
                clienteParaVenta = clienteRepo.findById(1)
                        .orElseThrow(() -> new RuntimeException(
                                "No se encontró el cliente por defecto ('Estimado Cliente'). Verifica que el ID 1 exista en la BD."));
            }

            venta.setCliente(clienteParaVenta);

            // --- GESTIÓN DE USUARIO / VENDEDOR ---
            Integer idUsuario = 2;
            if (body.get("idUsuario") != null && !body.get("idUsuario").toString().trim().isEmpty()) {
                idUsuario = Integer.parseInt(body.get("idUsuario").toString());
            }

            final Integer finalIdUsuario = idUsuario;
            Usuario usuario = usuarioRepo.findById(finalIdUsuario)
                    .orElseThrow(
                            () -> new RuntimeException("Usuario vendedor no encontrado con ID: " + finalIdUsuario));
            venta.setUsuario(usuario);

            // --- PROCESAMIENTO DE DETALLES ---
            List<Map<String, Object>> items = (List<Map<String, Object>>) body.get("detalles");
            if (items == null || items.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "La lista de detalles no puede estar vacía."));
            }

            BigDecimal totalVentaCalculado = BigDecimal.ZERO;
            String facturaNum = "FAC-" + System.currentTimeMillis();

            List<DetalleVenta> listaDetalles = new ArrayList<>();

            for (Map<String, Object> item : items) {
                Integer idProd = Integer.parseInt(item.get("idProducto").toString());
                BigDecimal cant = new BigDecimal(item.get("cantidad").toString());

                Producto prod = productoRepo.findById(idProd)
                        .orElseThrow(() -> new RuntimeException("Producto no encontrado ID: " + idProd));

                if (prod.getStock() < cant.intValue()) {
                    return ResponseEntity.badRequest()
                            .body(Map.of("error", "Sin stock suficiente de: " + prod.getNombre()));
                }

                prod.setStock(prod.getStock() - cant.intValue());
                productoRepo.save(prod);

                BigDecimal subtotal = prod.getPrecioVenta().multiply(cant);
                BigDecimal tasaIva = prod.getTasaIva() != null ? prod.getTasaIva() : new BigDecimal("0.19");
                BigDecimal montoIva = subtotal.multiply(tasaIva);
                BigDecimal totalLinea = subtotal.add(montoIva);

                DetalleVenta d = new DetalleVenta();
                d.setIdProducto(idProd);
                d.setCantidad(cant);
                d.setPrecioUnitario(prod.getPrecioVenta());
                d.setSubtotal(subtotal);
                d.setTasaIva(tasaIva);
                d.setMontoIva(montoIva);
                d.setTotalBase(subtotal);
                d.setTotalIva(montoIva);
                d.setTotalAPagar(totalLinea);
                d.setIdFactura(facturaNum);
                d.setEstado("ACTIVA");

                totalVentaCalculado = totalVentaCalculado.add(totalLinea);
                listaDetalles.add(d);
            }

            venta.setTotal(totalVentaCalculado);
            Venta guardada = ventaRepo.save(venta);

            for (DetalleVenta d : listaDetalles) {
                d.setIdVenta(guardada.getIdVenta());
                detalleVentaRepo.save(d);
            }

            return ResponseEntity.ok(Map.of(
                    "idVenta", guardada.getIdVenta(),
                    "factura", facturaNum,
                    "cliente", clienteParaVenta.getNombre(),
                    "total", totalVentaCalculado));

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }
}