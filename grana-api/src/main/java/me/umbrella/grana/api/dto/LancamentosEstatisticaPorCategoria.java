package me.umbrella.grana.api.dto;

import me.umbrella.grana.api.model.Categoria;

import java.math.BigDecimal;

public class LancamentosEstatisticaPorCategoria {

    private Categoria categoria;
    private BigDecimal total;


    public LancamentosEstatisticaPorCategoria(Categoria categoria, BigDecimal total) {
        this.categoria = categoria;
        this.total = total;
    }


    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }
}
