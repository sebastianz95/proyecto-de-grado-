package com.inventa.backend.repository;

import com.inventa.backend.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

// JpaRepository ya trae: findAll, findById, save, deleteById — sin código extra
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    // Puedes agregar búsquedas personalizadas aquí, por ejemplo:
    // List<Producto> findByNombreContaining(String texto);
}
