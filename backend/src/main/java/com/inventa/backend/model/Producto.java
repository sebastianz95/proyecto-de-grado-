package com.inventa.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "producto")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_producto")
    private Integer idProducto;

    @Column(name = "nombre", nullable = false, length = 150)
    private String nombre;

    @Column(name = "descripcion", columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "precio_compra", nullable = false, precision = 10, scale = 2)
    private BigDecimal precioCompra;

    @Column(name = "precio_venta", nullable = false, precision = 10, scale = 2)
    private BigDecimal precioVenta;

    @Column(name = "stock")
    private Integer stock = 0;

    // Relación con Categoria — muchos productos pertenecen a una categoría
    @ManyToOne
    @JoinColumn(name = "id_categoria", nullable = false)
    private Categoria categoria;

    // Relación con Proveedor — muchos productos tienen un proveedor
    @ManyToOne
    @JoinColumn(name = "id_proveedor", nullable = false)
    private Proveedor proveedor;

    // ── Getters y Setters ──
    public Integer    getIdProducto()               { return idProducto;    }
    public void       setIdProducto(Integer id)     { this.idProducto = id; }
    public String     getNombre()                   { return nombre;        }
    public void       setNombre(String n)           { this.nombre = n;      }
    public String     getDescripcion()              { return descripcion;   }
    public void       setDescripcion(String d)      { this.descripcion = d; }
    public BigDecimal getPrecioCompra()             { return precioCompra;  }
    public void       setPrecioCompra(BigDecimal p) { this.precioCompra = p;}
    public BigDecimal getPrecioVenta()              { return precioVenta;   }
    public void       setPrecioVenta(BigDecimal p)  { this.precioVenta = p; }
    public Integer    getStock()                    { return stock;         }
    public void       setStock(Integer s)           { this.stock = s;       }
    public Categoria  getCategoria()                { return categoria;     }
    public void       setCategoria(Categoria c)     { this.categoria = c;   }
    public Proveedor  getProveedor()                { return proveedor;     }
    public void       setProveedor(Proveedor p)     { this.proveedor = p;   }
}
