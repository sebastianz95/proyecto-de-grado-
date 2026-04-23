package com.inventa.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "usuario")
public class Usuario {

    // Enum que mapea exactamente el ENUM de MySQL
    public enum Rol {
        admin, vendedor, bodega
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Integer idUsuario;

    @Column(name = "nombre", nullable = false, length = 150)
    private String nombre;

    // Se mantiene "username" en Java para que React lo reconozca al enviar {
    // username: "..." }
    // Pero se mapea a la columna "usuario" de tu DB
    @Column(name = "usuario", nullable = false, unique = true, length = 100)
    private String username;

    @Column(name = "password", nullable = false, length = 255)
    private String password;

    // --- CAMPO AÑADIDO PARA CORREGIR EL ERROR ---
    @Column(name = "email", nullable = false, length = 150)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "rol", nullable = false)
    private Rol rol;

    // ── Getters y Setters ──

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // --- GETTER Y SETTER PARA EL EMAIL ---
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }
}