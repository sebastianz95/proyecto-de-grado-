package com.inventa.backend.repository;
import com.inventa.backend.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ProductoRepository extends JpaRepository<Producto, Integer> {}
