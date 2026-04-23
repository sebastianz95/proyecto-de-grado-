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
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:5173"})
public class ProductoController {

    @Autowired private ProductoRepository  productoRepo;
    @Autowired private CategoriaRepository categoriaRepo;
    @Autowired private ProveedorRepository proveedorRepo;

    @GetMapping
    public List<Map<String,Object>> listar() {
        return productoRepo.findAll().stream().map(this::toMap).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtener(@PathVariable Integer id) {
        return productoRepo.findById(id).map(p -> ResponseEntity.ok(toMap(p)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Map<String,Object> body) {
        return ResponseEntity.ok(toMap(productoRepo.save(fromMap(body, new Producto()))));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Integer id, @RequestBody Map<String,Object> body) {
        return productoRepo.findById(id).map(p -> ResponseEntity.ok(toMap(productoRepo.save(fromMap(body, p)))))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Integer id) {
        if (!productoRepo.existsById(id)) return ResponseEntity.notFound().build();
        productoRepo.deleteById(id);
        return ResponseEntity.ok(Map.of("mensaje","Producto eliminado"));
    }

    private Map<String,Object> toMap(Producto p) {
        Map<String,Object> m = new LinkedHashMap<>();
        m.put("idProducto",  p.getIdProducto());
        m.put("nombre",      p.getNombre());
        m.put("descripcion", p.getDescripcion() != null ? p.getDescripcion() : "");
        m.put("precioCompra",p.getPrecioCompra());
        m.put("precioVenta", p.getPrecioVenta());
        m.put("stock",       p.getStock() != null ? p.getStock() : 0);
        m.put("idCategoria", p.getCategoria() != null ? p.getCategoria().getIdCategoria() : null);
        m.put("categoria",   p.getCategoria() != null ? p.getCategoria().getNombre() : "");
        m.put("idProveedor", p.getProveedor() != null ? p.getProveedor().getIdProveedor() : null);
        m.put("proveedor",   p.getProveedor() != null ? p.getProveedor().getNombre() : "");
        return m;
    }

    private Producto fromMap(Map<String,Object> b, Producto p) {
        if (b.containsKey("nombre"))       p.setNombre((String) b.get("nombre"));
        if (b.containsKey("descripcion"))  p.setDescripcion((String) b.get("descripcion"));
        if (b.containsKey("precioVenta"))  p.setPrecioVenta(new BigDecimal(b.get("precioVenta").toString()));
        if (b.containsKey("precioCompra")) p.setPrecioCompra(new BigDecimal(b.get("precioCompra").toString()));
        if (b.containsKey("stock"))        p.setStock(Integer.valueOf(b.get("stock").toString()));
        if (b.containsKey("idCategoria"))  categoriaRepo.findById(Integer.valueOf(b.get("idCategoria").toString())).ifPresent(p::setCategoria);
        if (b.containsKey("idProveedor"))  proveedorRepo.findById(Integer.valueOf(b.get("idProveedor").toString())).ifPresent(p::setProveedor);
        return p;
    }
}
