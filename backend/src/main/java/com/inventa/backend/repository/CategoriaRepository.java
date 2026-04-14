package com.inventa.backend.repository;
import com.inventa.backend.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {}
