package com.inventa.backend.controller;

import com.inventa.backend.model.Producto;
import com.inventa.backend.repository.CategoriaRepository;
import com.inventa.backend.repository.ProductoRepository;
import com.inventa.backend.repository.ProveedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:5173" })
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepo;
    @Autowired
    private CategoriaRepository categoriaRepo;
    @Autowired
    private ProveedorRepository proveedorRepo;

    @GetMapping
    public List<Map<String, Object>> listar() {
        return productoRepo.findAll().stream().map(this::toMap).collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Map<String, Object> body) {
        try {
            Producto nuevo = fromMap(body, new Producto());
            return ResponseEntity.ok(toMap(productoRepo.save(nuevo)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Integer id, @RequestBody Map<String, Object> body) {
        return productoRepo.findById(id)
                .map(p -> ResponseEntity.ok(toMap(productoRepo.save(fromMap(body, p)))))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Integer id) {
        productoRepo.deleteById(id);
        return ResponseEntity.ok(Map.of("mensaje", "Eliminado"));
    }

    private Map<String, Object> toMap(Producto p) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("idProducto", p.getIdProducto());
        m.put("nombre", p.getNombre());
        m.put("descripcion", p.getDescripcion() != null ? p.getDescripcion() : "");
        m.put("precioCompra", p.getPrecioCompra());
        m.put("precioVenta", p.getPrecioVenta());
        m.put("stock", p.getStock());
        m.put("tasaIva", p.getTasaIva() != null ? p.getTasaIva() : new BigDecimal("0.19"));
        m.put("categoria", p.getCategoria() != null ? p.getCategoria().getNombre() : "N/A");
        m.put("idCategoria", p.getCategoria() != null ? p.getCategoria().getIdCategoria() : null);
        m.put("proveedor", p.getProveedor() != null ? p.getProveedor().getNombre() : "N/A");
        m.put("idProveedor", p.getProveedor() != null ? p.getProveedor().getIdProveedor() : null);
        return m;
    }

    private Producto fromMap(Map<String, Object> b, Producto p) {
        if (b.get("nombre") != null)
            p.setNombre(b.get("nombre").toString());
        if (b.get("descripcion") != null)
            p.setDescripcion(b.get("descripcion").toString());
        if (b.get("precioVenta") != null)
            p.setPrecioVenta(new BigDecimal(b.get("precioVenta").toString()));
        if (b.get("precioCompra") != null)
            p.setPrecioCompra(new BigDecimal(b.get("precioCompra").toString()));
        if (b.get("stock") != null)
            p.setStock(Integer.valueOf(b.get("stock").toString()));

        // Captura el IVA variable enviado desde React
        if (b.get("tasaIva") != null) {
            p.setTasaIva(new BigDecimal(b.get("tasaIva").toString()));
        }

        if (b.get("idCategoria") != null) {
            categoriaRepo.findById(Integer.valueOf(b.get("idCategoria").toString())).ifPresent(p::setCategoria);
        }
        if (b.get("idProveedor") != null) {
            proveedorRepo.findById(Integer.valueOf(b.get("idProveedor").toString())).ifPresent(p::setProveedor);
        }
        return p;
    }
}