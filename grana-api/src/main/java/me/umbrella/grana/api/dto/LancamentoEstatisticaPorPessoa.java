package me.umbrella.grana.api.dto;

import me.umbrella.grana.api.model.Pessoa;
import me.umbrella.grana.api.model.TipoLancamento;

import java.math.BigDecimal;

public class LancamentoEstatisticaPorPessoa {

    private TipoLancamento tipo;
    private Pessoa pessoa;
    private BigDecimal total;

    public LancamentoEstatisticaPorPessoa(TipoLancamento tipo, Pessoa pessoa, BigDecimal total) {
        this.tipo = tipo;
        this.pessoa = pessoa;
        this.total = total;
    }

    public TipoLancamento getTipo() {
        return tipo;
    }

    public void setTipo(TipoLancamento tipo) {
        this.tipo = tipo;
    }

    public Pessoa getPessoa() {
        return pessoa;
    }

    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }
}
