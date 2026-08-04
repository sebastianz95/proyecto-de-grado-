package com.inventa.backend.repository;

import com.inventa.backend.model.Venta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VentaRepository extends JpaRepository<Venta, Integer> {
    // JpaRepository ya trae los métodos .save() y .findAll() listos
}