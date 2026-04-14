package com.inventa.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "venta")
public class Venta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_venta")
    private Integer idVenta;

    @Column(name = "fecha_venta", nullable = false)
    private LocalDateTime fechaVenta;

    // Relación con Cliente
    @ManyToOne
    @JoinColumn(name = "id_cliente", nullable = false)
    private Cliente cliente;

    // Relación con Usuario (quién realizó la venta)
    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @Column(name = "total", nullable = false, precision = 10, scale = 2)
    private BigDecimal total;

    // Relación con el detalle de la venta (los productos incluidos)
    @OneToMany(mappedBy = "venta", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<DetalleVenta> detalles;

    // ── Getters y Setters ──
    public Integer       getIdVenta()                     { return idVenta;           }
    public void          setIdVenta(Integer id)           { this.idVenta = id;        }
    public LocalDateTime getFechaVenta()                  { return fechaVenta;        }
    public void          setFechaVenta(LocalDateTime f)   { this.fechaVenta = f;      }
    public Cliente       getCliente()                     { return cliente;           }
    public void          setCliente(Cliente c)            { this.cliente = c;         }
    public Usuario       getUsuario()                     { return usuario;           }
    public void          setUsuario(Usuario u)            { this.usuario = u;         }
    public BigDecimal    getTotal()                       { return total;             }
    public void          setTotal(BigDecimal t)           { this.total = t;           }
    public List<DetalleVenta> getDetalles()               { return detalles;          }
    public void          setDetalles(List<DetalleVenta> d){ this.detalles = d;        }
}
