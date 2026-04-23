package com.inventa.backend.controller;

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
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:5173" })
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepo;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private PasswordEncoder passwordEncoder;

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        Optional<Usuario> opcional = usuarioRepo.findByUsername(username);

        if (opcional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Usuario no encontrado"));
        }

        Usuario usuario = opcional.get();

        if (!passwordEncoder.matches(password, usuario.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Contraseña incorrecta"));
        }

        String token = jwtUtil.generarToken(usuario.getUsername());

        return ResponseEntity.ok(Map.of(
                "token", token,
                "nombre", usuario.getNombre(),
                "username", usuario.getUsername(),
                "rol", usuario.getRol().name()));
    }

    // REGISTRO
    @PostMapping("/registro")
    public ResponseEntity<?> registro(@RequestBody Usuario nuevo) {
        // Validar si ya existe
        if (usuarioRepo.findByUsername(nuevo.getUsername()).isPresent()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "El nombre de usuario ya existe"));
        }

        // Encriptar contraseña
        nuevo.setPassword(passwordEncoder.encode(nuevo.getPassword()));

        // Asignar rol por defecto si no viene
        if (nuevo.getRol() == null)
            nuevo.setRol(Usuario.Rol.vendedor);

        usuarioRepo.save(nuevo);
        return ResponseEntity.ok(Map.of("mensaje", "Usuario creado exitosamente"));
    }
}