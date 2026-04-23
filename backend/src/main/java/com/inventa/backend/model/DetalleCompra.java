package com.inventa.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "detalle_compra")
public class DetalleCompra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detalle_compra")
    private Integer idDetalleCompra;

    @ManyToOne
    @JoinColumn(name = "id_compra", nullable = false)
    private Compra compra;

    @ManyToOne
    @JoinColumn(name = "id_producto", nullable = false)
    private Producto producto;

    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;

    @Column(name = "costo", nullable = false, precision = 10, scale = 2)
    private BigDecimal costo;

    // ── Getters y Setters ──
    public Integer    getIdDetalleCompra()            { return idDetalleCompra;     }
    public void       setIdDetalleCompra(Integer id)  { this.idDetalleCompra = id;  }
    public Compra     getCompra()                     { return compra;              }
    public void       setCompra(Compra c)             { this.compra = c;            }
    public Producto   getProducto()                   { return producto;            }
    public void       setProducto(Producto p)         { this.producto = p;          }
    public Integer    getCantidad()                   { return cantidad;            }
    public void       setCantidad(Integer c)          { this.cantidad = c;          }
    public BigDecimal getCosto()                      { return costo;               }
    public void       setCosto(BigDecimal c)          { this.costo = c;             }
}
