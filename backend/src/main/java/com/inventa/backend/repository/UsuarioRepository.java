package com.inventa.backend.repository;

import com.inventa.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByUsername(String username);

    // AÑADE ESTO: Nos servirá para que no se registren dos personas con el mismo
    // nombre
    boolean existsByUsername(String username);
}