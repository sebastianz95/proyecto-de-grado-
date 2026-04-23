package com.inventa.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "cliente")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cliente")
    private Integer idCliente;

    @Column(name = "nombre", nullable = false, length = 150)
    private String nombre;

    @Column(name = "cedula", unique = true, length = 50)
    private String cedula;

    @Column(name = "telefono", length = 50)
    private String telefono;

    @Column(name = "correo", length = 150)
    private String correo;

    @Column(name = "direccion", length = 200)
    private String direccion;

    // ── Getters y Setters ──
    public Integer getIdCliente()              { return idCliente;   }
    public void    setIdCliente(Integer id)    { this.idCliente = id; }
    public String  getNombre()                 { return nombre;      }
    public void    setNombre(String n)         { this.nombre = n;    }
    public String  getCedula()                 { return cedula;      }
    public void    setCedula(String c)         { this.cedula = c;    }
    public String  getTelefono()               { return telefono;    }
    public void    setTelefono(String t)       { this.telefono = t;  }
    public String  getCorreo()                 { return correo;      }
    public void    setCorreo(String e)         { this.correo = e;    }
    public String  getDireccion()              { return direccion;   }
    public void    setDireccion(String d)      { this.direccion = d; }
}
