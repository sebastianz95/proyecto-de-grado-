package com.inventa.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "proveedor")
public class Proveedor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_proveedor")
    private Integer idProveedor;

    @Column(name = "nombre", nullable = false, length = 150)
    private String nombre;

    @Column(name = "telefono", length = 50)
    private String telefono;

    @Column(name = "correo", length = 150)
    private String correo;

    @Column(name = "direccion", length = 200)
    private String direccion;

    // ── Getters y Setters ──
    public Integer getIdProveedor()             { return idProveedor;   }
    public void    setIdProveedor(Integer id)   { this.idProveedor = id; }
    public String  getNombre()                  { return nombre;        }
    public void    setNombre(String n)          { this.nombre = n;      }
    public String  getTelefono()                { return telefono;      }
    public void    setTelefono(String t)        { this.telefono = t;    }
    public String  getCorreo()                  { return correo;        }
    public void    setCorreo(String e)          { this.correo = e;      }
    public String  getDireccion()               { return direccion;     }
    public void    setDireccion(String d)       { this.direccion = d;   }
}
