package com.inventa.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

// @Component hace que Spring lo gestione como un bean (se puede inyectar con @Autowired)
@Component
public class JwtUtil {

    // Lee el valor de jwt.secret en application.properties
    @Value("${jwt.secret}")
    private String secret;

    // Lee el valor de jwt.expiration en application.properties
    @Value("${jwt.expiration}")
    private long expiration;

    // Construye la clave criptográfica a partir del string secreto
    private Key getKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    // ── GENERAR TOKEN ──
    // Se llama cuando el usuario hace login correctamente
    public String generarToken(String email) {
        return Jwts.builder()
                .setSubject(email)                              // quién es el usuario
                .setIssuedAt(new Date())                        // cuándo se creó
                .setExpiration(new Date(System.currentTimeMillis() + expiration)) // cuándo expira
                .signWith(getKey(), SignatureAlgorithm.HS256)   // firma con nuestra clave
                .compact();
    }

    // ── EXTRAER EMAIL DEL TOKEN ──
    // Se llama en cada petición para saber quién está haciendo la solicitud
    public String extraerEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // ── VALIDAR TOKEN ──
    // Verifica que el token no esté alterado ni expirado
    public boolean esValido(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(getKey()).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false; // token inválido o expirado
        }
    }
}
