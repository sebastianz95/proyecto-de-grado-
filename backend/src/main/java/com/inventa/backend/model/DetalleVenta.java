package com.inventa.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "detalle_venta")
public class DetalleVenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detalle")
    private Integer idDetalle;

    // Relación muchos detalles → una venta
    @ManyToOne
    @JoinColumn(name = "id_venta", nullable = false)
    private Venta venta;

    // Relación muchos detalles → un producto
    @ManyToOne
    @JoinColumn(name = "id_producto", nullable = false)
    private Producto producto;

    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;

    @Column(name = "subtotal", nullable = false, precision = 10, scale = 2)
    private BigDecimal subtotal;

    // ── Getters y Setters ──
    public Integer    getIdDetalle()              { return idDetalle;     }
    public void       setIdDetalle(Integer id)    { this.idDetalle = id;  }
    public Venta      getVenta()                  { return venta;         }
    public void       setVenta(Venta v)           { this.venta = v;       }
    public Producto   getProducto()               { return producto;      }
    public void       setProducto(Producto p)     { this.producto = p;    }
    public Integer    getCantidad()               { return cantidad;      }
    public void       setCantidad(Integer c)      { this.cantidad = c;    }
    public BigDecimal getSubtotal()               { return subtotal;      }
    public void       setSubtotal(BigDecimal s)   { this.subtotal = s;    }
}
