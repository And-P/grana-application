package me.umbrella.grana.api.repository.filter;

import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;


public class LancamentoFilter {

	// PESQUISA POR DESCRIÇÃO (ex.: salário)
	private String descricao;
	
	// PESQUISA POR INTERVALO DE TEMPO
	@DateTimeFormat(pattern="dd/MM/yyyy")
	private LocalDate dataVencimentoDe;
	
	@DateTimeFormat(pattern="dd/MM/yyyy")
	private LocalDate dataVencimentoAte;
	
	
	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public LocalDate getDataVencimentoDe() {
		return dataVencimentoDe;
	}

	public void setDataVencimentoDe(LocalDate dataVencimentoDe) {
		this.dataVencimentoDe = dataVencimentoDe;
	}

	public LocalDate getDataVencimentoAte() {
		return dataVencimentoAte;
	}

	public void setDataVencimentoAte(LocalDate dataVencimentoAte) {
		this.dataVencimentoAte = dataVencimentoAte;
	}

}
