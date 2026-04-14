package com.inventa.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "categoria")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_categoria")
    private Integer idCategoria;

    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    @Column(name = "descripcion", columnDefinition = "TEXT")
    private String descripcion;

    // ── Getters y Setters ──
    public Integer getIdCategoria()            { return idCategoria;  }
    public void    setIdCategoria(Integer id)  { this.idCategoria = id; }
    public String  getNombre()                 { return nombre;       }
    public void    setNombre(String nombre)    { this.nombre = nombre; }
    public String  getDescripcion()            { return descripcion;  }
    public void    setDescripcion(String d)    { this.descripcion = d; }
}
