package me.umbrella.grana.api.repository.lancamento;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import me.umbrella.grana.api.model.Lancamento;
import me.umbrella.grana.api.repository.filter.LancamentoFilter;
import me.umbrella.grana.api.repository.projection.LancamentoProjection;

public interface LancamentoRepositoryQuery {

	public Page<Lancamento> filtrar(LancamentoFilter lancamentoFilter, Pageable pageable);
	public Page<LancamentoProjection> resumir(LancamentoFilter lancamentoFilter, Pageable pageable);
	
}