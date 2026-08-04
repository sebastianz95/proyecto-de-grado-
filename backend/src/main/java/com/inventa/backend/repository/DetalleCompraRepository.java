package com.inventa.backend.repository;

import com.inventa.backend.model.DetalleCompra; // O como se llame tu modelo de compra
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetalleCompraRepository extends JpaRepository<DetalleCompra, Integer> {
}