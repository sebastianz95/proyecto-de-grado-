package com.inventa.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

// Este filtro se ejecuta en CADA petición HTTP antes de llegar al controller
@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // 1. Leer el header "Authorization" de la petición
        String authHeader = request.getHeader("Authorization");

        // 2. El header debe tener formato: "Bearer <token>"
        if (authHeader != null && authHeader.startsWith("Bearer ")) {

            String token = authHeader.substring(7); // quitar "Bearer "

            // 3. Validar el token
            if (jwtUtil.esValido(token)) {
                String email = jwtUtil.extraerEmail(token);

                // 4. Decirle a Spring Security que este usuario está autenticado
                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(email, null, new ArrayList<>());

                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }

        // 5. Continuar con el siguiente filtro / controller
        filterChain.doFilter(request, response);
    }
}
