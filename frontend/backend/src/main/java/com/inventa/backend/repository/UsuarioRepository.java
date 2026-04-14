package com.inventa.backend.repository;

import com.inventa.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Buscar usuario por email (para el login)
    Optional<Usuario> findByEmail(String email);
}
