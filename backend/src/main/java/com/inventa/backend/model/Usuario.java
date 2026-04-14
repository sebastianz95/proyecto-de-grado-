package com.inventa.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "usuario")
public class Usuario {

    // Enum que mapea exactamente el ENUM de MySQL: admin, vendedor, bodega
    public enum Rol { admin, vendedor, bodega }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Integer idUsuario;

    @Column(name = "nombre", nullable = false, length = 150)
    private String nombre;

    // "usuario" es el campo de login (username), distinto de "nombre"
    @Column(name = "usuario", nullable = false, unique = true, length = 100)
    private String username;

    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "rol", nullable = false)
    private Rol rol;

    // ── Getters y Setters ──
    public Integer getIdUsuario()            { return idUsuario;     }
    public void    setIdUsuario(Integer id)  { this.idUsuario = id;  }
    public String  getNombre()               { return nombre;        }
    public void    setNombre(String n)       { this.nombre = n;      }
    public String  getUsername()             { return username;      }
    public void    setUsername(String u)     { this.username = u;    }
    public String  getPassword()             { return password;      }
    public void    setPassword(String p)     { this.password = p;    }
    public Rol     getRol()                  { return rol;           }
    public void    setRol(Rol r)             { this.rol = r;         }
}
