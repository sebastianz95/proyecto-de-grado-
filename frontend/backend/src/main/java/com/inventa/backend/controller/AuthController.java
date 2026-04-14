package com.inventa.backend.controller;

import com.inventa.backend.dto.LoginRequest;
import com.inventa.backend.dto.LoginResponse;
import com.inventa.backend.model.Usuario;
import com.inventa.backend.repository.UsuarioRepository;
import com.inventa.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5500", "http://127.0.0.1:5500"})
public class AuthController {

    @Autowired private UsuarioRepository usuarioRepo;
    @Autowired private JwtUtil           jwtUtil;
    @Autowired private PasswordEncoder   passwordEncoder;

    // ── POST /api/auth/login ──────────────────────────────────────────
    // React envía: { "email": "...", "password": "..." }
    // Spring devuelve: { "token": "...", "nombre": "...", ... }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        // 1. Buscar usuario por email
        Optional<Usuario> opcional = usuarioRepo.findByEmail(request.getEmail());

        if (opcional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Usuario no encontrado"));
        }

        Usuario usuario = opcional.get();

        // 2. Verificar contraseña (BCrypt compara el hash)
        if (!passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Contraseña incorrecta"));
        }

        // 3. Generar token JWT
        String token = jwtUtil.generarToken(usuario.getEmail());

        // 4. Devolver token + datos básicos del usuario
        return ResponseEntity.ok(new LoginResponse(
                token,
                usuario.getNombre(),
                usuario.getEmail(),
                usuario.getRol()
        ));
    }

    // ── POST /api/auth/registro ───────────────────────────────────────
    // Para crear el primer usuario admin (o un registro público)
    @PostMapping("/registro")
    public ResponseEntity<?> registro(@RequestBody Usuario nuevoUsuario) {

        // Verificar que el email no esté ya registrado
        if (usuarioRepo.findByEmail(nuevoUsuario.getEmail()).isPresent()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "El email ya está registrado"));
        }

        // Encriptar contraseña antes de guardar (NUNCA guardar en texto plano)
        nuevoUsuario.setPassword(passwordEncoder.encode(nuevoUsuario.getPassword()));

        // Asignar rol por defecto
        if (nuevoUsuario.getRol() == null) nuevoUsuario.setRol("USER");

        usuarioRepo.save(nuevoUsuario);

        return ResponseEntity.ok(Map.of("mensaje", "Usuario creado correctamente"));
    }
}
