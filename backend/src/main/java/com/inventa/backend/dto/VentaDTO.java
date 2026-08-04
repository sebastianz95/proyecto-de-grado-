package com.inventa.backend.dto;

import java.math.BigDecimal;
import java.util.List;

public class VentaDTO {
    private Integer idVenta;
    private BigDecimal total;
    private List<DetalleDTO> detalles; // <-- Asegúrate de que use DetalleDTO

    public VentaDTO() {
    }

    public VentaDTO(Integer idVenta, BigDecimal total, List<DetalleDTO> detalles) {
        this.idVenta = idVenta;
        this.total = total;
        this.detalles = detalles;
    }

    public Integer getIdVenta() {
        return idVenta;
    }

    public void setIdVenta(Integer idVenta) {
        this.idVenta = idVenta;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public List<DetalleDTO> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetalleDTO> detalles) {
        this.detalles = detalles;
    }
}