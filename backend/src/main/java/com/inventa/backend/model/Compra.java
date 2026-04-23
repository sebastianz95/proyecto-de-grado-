package com.inventa.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "compra")
public class Compra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_compra")
    private Integer idCompra;

    @Column(name = "fecha_compra", nullable = false)
    private LocalDateTime fechaCompra;

    @ManyToOne
    @JoinColumn(name = "id_proveedor", nullable = false)
    private Proveedor proveedor;

    @Column(name = "total", nullable = false, precision = 10, scale = 2)
    private BigDecimal total;

    @OneToMany(mappedBy = "compra", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<DetalleCompra> detalles;

    // ── Getters y Setters ──
    public Integer       getIdCompra()                     { return idCompra;          }
    public void          setIdCompra(Integer id)           { this.idCompra = id;       }
    public LocalDateTime getFechaCompra()                  { return fechaCompra;       }
    public void          setFechaCompra(LocalDateTime f)   { this.fechaCompra = f;     }
    public Proveedor     getProveedor()                    { return proveedor;         }
    public void          setProveedor(Proveedor p)         { this.proveedor = p;       }
    public BigDecimal    getTotal()                        { return total;             }
    public void          setTotal(BigDecimal t)            { this.total = t;           }
    public List<DetalleCompra> getDetalles()               { return detalles;          }
    public void          setDetalles(List<DetalleCompra> d){ this.detalles = d;        }
}
