package com.inventa.backend.service;

import com.inventa.backend.dto.VentaDTO;
import com.inventa.backend.model.*;
import com.inventa.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class VentaService {

    @Autowired
    private VentaRepository ventaRepo;
    @Autowired
    private ProductoRepository productoRepo;
    @Autowired
    private DetalleVentaRepository detalleVentaRepo;

    @Transactional
    public Venta procesarVenta(VentaDTO dto) {
        // 1. Crear Cabecera de Venta
        Venta venta = new Venta();
        venta.setFechaVenta(LocalDateTime.now());
        venta.setTotal(BigDecimal.valueOf(dto.getTotal()));
        Venta guardada = ventaRepo.save(venta);

        String facturaNum = "FAC-" + System.currentTimeMillis();

        // 2. Procesar cada producto
        for (VentaDTO.DetalleDTO det : dto.getDetalles()) {
            Producto p = productoRepo.findById(det.getIdProducto().intValue())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado ID: " + det.getIdProducto()));

            // Cálculos con IVA del producto (si es null usa 0.19 por defecto)
            BigDecimal cantidad = BigDecimal.valueOf(det.getCantidad());
            BigDecimal precio = p.getPrecioVenta();
            BigDecimal tasaIva = (p.getTasaIva() != null) ? p.getTasaIva() : new BigDecimal("0.19");

            BigDecimal subtotal = precio.multiply(cantidad);
            BigDecimal montoIva = subtotal.multiply(tasaIva);
            BigDecimal totalFila = subtotal.add(montoIva);

            // 3. Crear el detalle con todos los campos obligatorios
            DetalleVenta dv = new DetalleVenta();
            dv.setIdVenta(guardada.getIdVenta());
            dv.setIdProducto(p.getIdProducto());
            dv.setCantidad(cantidad);
            dv.setPrecioUnitario(precio);
            dv.setSubtotal(subtotal);
            dv.setTasaIva(tasaIva);
            dv.setMontoIva(montoIva);
            dv.setTotalBase(subtotal);
            dv.setTotalIva(montoIva);
            dv.setTotalAPagar(totalFila);
            dv.setIdFactura(facturaNum);
            dv.setEstado("ACTIVA");

            detalleVentaRepo.save(dv);

            // 4. Actualizar Stock
            p.setStock(p.getStock() - det.getCantidad());
            productoRepo.save(p);
        }
        return guardada;
    }

    public List<Venta> obtenerTodas() {
        return ventaRepo.findAll();
    }
}