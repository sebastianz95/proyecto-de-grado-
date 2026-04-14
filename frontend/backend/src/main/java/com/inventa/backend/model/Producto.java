package com.inventa.backend.model;

import jakarta.persistence.*;

// @Entity le dice a Spring que esta clase es una tabla en MySQL
@Entity
@Table(name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // AUTO INCREMENT
    private Long id;

    private String nombre;
    private int stock;
    private double precio;
    private String estado; // "Disponible", "Agotado"

    // ── Constructores ──
    public Producto() {}

    public Producto(String nombre, int stock, double precio, String estado) {
        this.nombre = nombre;
        this.stock  = stock;
        this.precio = precio;
        this.estado = estado;
    }

    // ── Getters y Setters (Spring los necesita para convertir a JSON) ──
    public Long   getId()     { return id;     }
    public String getNombre() { return nombre; }
    public int    getStock()  { return stock;  }
    public double getPrecio() { return precio; }
    public String getEstado() { return estado; }

    public void setId(Long id)         { this.id     = id;     }
    public void setNombre(String n)    { this.nombre = n;      }
    public void setStock(int s)        { this.stock  = s;      }
    public void setPrecio(double p)    { this.precio = p;      }
    public void setEstado(String e)    { this.estado = e;      }
}
