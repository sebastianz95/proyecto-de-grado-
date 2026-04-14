package com.inventa.backend.controller;
import com.inventa.backend.model.Categoria;
import com.inventa.backend.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List; import java.util.Map;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:5173"})
public class CategoriaController {
    @Autowired private CategoriaRepository repo;
    @GetMapping              public List<Categoria> listar()                                   { return repo.findAll(); }
    @GetMapping("/{id}")     public ResponseEntity<Categoria> obtener(@PathVariable Integer id){ return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build()); }
    @PostMapping             public Categoria crear(@RequestBody Categoria obj)                { return repo.save(obj); }
    @DeleteMapping("/{id}")  public ResponseEntity<?> eliminar(@PathVariable Integer id)       { repo.deleteById(id); return ResponseEntity.ok(Map.of("mensaje","Eliminado")); }
}
