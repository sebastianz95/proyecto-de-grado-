package com.inventa.backend.util;

import org.springframework.stereotype.Component;
import java.math.BigDecimal;
import java.math.RoundingMode;

@Component
public class CalculadoraImpuestos {

    private static final double TASA_GENERAL = 0.19;
    private static final double TASA_SIMPLIFICADO_EMPRESA = 0.09;
    private static final double TASA_SIMPLIFICADO_INDIVIDUO = 0.05;

    public double obtenerTasaDefault(String idRegimen, Boolean esIndividuo) {
        if (idRegimen == null || idRegimen.isEmpty())
            return TASA_GENERAL;
        try {
            int reg = Integer.parseInt(idRegimen);
            if (reg == 0)
                return TASA_GENERAL;
            if (reg == 1)
                return esIndividuo ? TASA_SIMPLIFICADO_INDIVIDUO : TASA_SIMPLIFICADO_EMPRESA;
        } catch (NumberFormatException e) {
            return TASA_GENERAL;
        }
        return TASA_GENERAL;
    }

    public BigDecimal calcularMontoIva(BigDecimal baseNeta, double tasaIva) {
        return baseNeta.multiply(new BigDecimal(tasaIva)).setScale(2, RoundingMode.HALF_UP);
    }
}