package com.inventa.backend.controller;
import com.inventa.backend.model.Cliente;
import com.inventa.backend.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List; import java.util.Map;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:5173"})
public class ClienteController {
    @Autowired private ClienteRepository repo;
    @GetMapping              public List<Cliente> listar()                                  { return repo.findAll(); }
    @GetMapping("/{id}")     public ResponseEntity<Cliente> obtener(@PathVariable Integer id){ return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build()); }
    @PostMapping             public Cliente crear(@RequestBody Cliente obj)                 { return repo.save(obj); }
    @DeleteMapping("/{id}")  public ResponseEntity<?> eliminar(@PathVariable Integer id)    { repo.deleteById(id); return ResponseEntity.ok(Map.of("mensaje","Eliminado")); }
}
