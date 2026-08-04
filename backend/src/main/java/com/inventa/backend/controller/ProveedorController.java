package com.inventa.backend.controller;

import com.inventa.backend.model.Proveedor;
import com.inventa.backend.repository.ProveedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/proveedores")
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:5173" })
public class ProveedorController {
    @Autowired
    private ProveedorRepository repo;

    @GetMapping
    public List<Proveedor> listar() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Proveedor> obtener(@PathVariable Integer id) {
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Proveedor crear(@RequestBody Proveedor obj) {
        return repo.save(obj);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Integer id) {
        repo.deleteById(id);
        return ResponseEntity.ok(Map.of("mensaje", "Eliminado"));
    }
}
