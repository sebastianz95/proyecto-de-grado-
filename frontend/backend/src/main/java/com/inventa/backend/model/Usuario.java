package com.inventa.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password; // guardada con BCrypt (encriptada)

    private String nombre;

    private String rol; // "ADMIN" o "USER"

    // ── Constructores ──
    public Usuario() {}

    public Usuario(String email, String password, String nombre, String rol) {
        this.email    = email;
        this.password = password;
        this.nombre   = nombre;
        this.rol      = rol;
    }

    // ── Getters y Setters ──
    public Long   getId()       { return id;       }
    public String getEmail()    { return email;    }
    public String getPassword() { return password; }
    public String getNombre()   { return nombre;   }
    public String getRol()      { return rol;      }

    public void setId(Long id)            { this.id       = id;       }
    public void setEmail(String email)    { this.email    = email;    }
    public void setPassword(String pass)  { this.password = pass;     }
    public void setNombre(String nombre)  { this.nombre   = nombre;   }
    public void setRol(String rol)        { this.rol      = rol;      }
}
