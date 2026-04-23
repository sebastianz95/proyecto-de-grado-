package com.inventa.backend.controller;

import com.inventa.backend.model.*;
import com.inventa.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/ventas")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:5173"})
public class VentaController {

    @Autowired private VentaRepository        ventaRepo;
    @Autowired private ClienteRepository      clienteRepo;
    @Autowired private UsuarioRepository      usuarioRepo;
    @Autowired private ProductoRepository     productoRepo;
    @Autowired private DetalleVentaRepository detalleVentaRepo;

    @GetMapping
    public List<Map<String,Object>> listar() {
        return ventaRepo.findAll().stream().map(v -> {
            Map<String,Object> m = new LinkedHashMap<>();
            m.put("idVenta",    v.getIdVenta());
            m.put("fechaVenta", v.getFechaVenta());
            m.put("total",      v.getTotal());
            m.put("cliente",    v.getCliente()  != null ? Map.of("nombre", v.getCliente().getNombre())  : null);
            m.put("usuario",    v.getUsuario()  != null ? Map.of("nombre", v.getUsuario().getNombre())  : null);
            return m;
        }).collect(Collectors.toList());
    }

    @PostMapping
    @SuppressWarnings("unchecked")
    public ResponseEntity<?> crear(@RequestBody Map<String,Object> body) {
        Venta venta = new Venta();
        venta.setFechaVenta(LocalDateTime.now());
        clienteRepo.findById((Integer) body.get("idCliente")).ifPresent(venta::setCliente);
        usuarioRepo.findById((Integer) body.get("idUsuario")).ifPresent(venta::setUsuario);

        List<Map<String,Object>> items = (List<Map<String,Object>>) body.get("detalles");
        BigDecimal total = BigDecimal.ZERO;
        List<DetalleVenta> detalles = new ArrayList<>();

        for (Map<String,Object> item : items) {
            Integer idProd   = Integer.valueOf(item.get("idProducto").toString());
            Integer cantidad = Integer.valueOf(item.get("cantidad").toString());
            Producto prod    = productoRepo.findById(idProd).orElseThrow();
            if (prod.getStock() < cantidad)
                return ResponseEntity.badRequest().body(Map.of("error","Stock insuficiente: " + prod.getNombre()));
            prod.setStock(prod.getStock() - cantidad);
            productoRepo.save(prod);
            DetalleVenta d = new DetalleVenta();
            d.setProducto(prod); d.setCantidad(cantidad);
            BigDecimal sub = prod.getPrecioVenta().multiply(BigDecimal.valueOf(cantidad));
            d.setSubtotal(sub); total = total.add(sub);
            detalles.add(d);
        }

        venta.setTotal(total);
        Venta guardada = ventaRepo.save(venta);
        detalles.forEach(d -> { d.setVenta(guardada); detalleVentaRepo.save(d); });
        return ResponseEntity.ok(Map.of("idVenta", guardada.getIdVenta(), "total", guardada.getTotal()));
    }
}
