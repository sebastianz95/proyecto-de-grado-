package com.inventa.backend.controller;

import com.inventa.backend.model.Producto;
import com.inventa.backend.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// @RestController = maneja peticiones HTTP y devuelve JSON
@RestController
@RequestMapping("/api/productos")
// @CrossOrigin permite que React (puerto 3000) se conecte con Spring (8080)
@CrossOrigin(origins = "http://localhost:3000")
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;

    // GET /api/productos → lista todos
    @GetMapping
    public List<Producto> listar() {
        return productoRepository.findAll();
    }

    // POST /api/productos → crea uno nuevo
    @PostMapping
    public Producto crear(@RequestBody Producto producto) {
        return productoRepository.save(producto);
    }

    // PUT /api/productos/{id} → edita uno existente
    @PutMapping("/{id}")
    public Producto actualizar(@PathVariable Long id, @RequestBody Producto datos) {
        Producto p = productoRepository.findById(id).orElseThrow();
        p.setNombre(datos.getNombre());
        p.setStock(datos.getStock());
        p.setPrecio(datos.getPrecio());
        return productoRepository.save(p);
    }

    // DELETE /api/productos/{id} → elimina uno
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        productoRepository.deleteById(id);
    }
}
