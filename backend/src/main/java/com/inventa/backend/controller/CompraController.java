package com.inventa.backend.controller;
import com.inventa.backend.model.Compra;
import com.inventa.backend.repository.CompraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List; import java.util.Map;

@RestController
@RequestMapping("/api/compras")
@CrossOrigin(origins = "http://localhost:3000")
public class CompraController {
    @Autowired private CompraRepository repo;

    @GetMapping        public List<Compra> listar()                               { return repo.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<Compra> obtener(@PathVariable Integer id) { return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build()); }
    @PostMapping       public Compra crear(@RequestBody Compra obj)            { return repo.save(obj); }
    @DeleteMapping("/{id}") public ResponseEntity<?> eliminar(@PathVariable Integer id) { repo.deleteById(id); return ResponseEntity.ok(Map.of("mensaje","Eliminado")); }
}
