package me.umbrella.grana.api.repository.lancamento;

import me.umbrella.grana.api.dto.LancamentosEstatisticaPorCategoria;
import me.umbrella.grana.api.dto.LancamentosEstatisticaPorDia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import me.umbrella.grana.api.model.Lancamento;
import me.umbrella.grana.api.repository.filter.LancamentoFilter;
import me.umbrella.grana.api.repository.projection.LancamentoProjection;

import java.time.LocalDate;
import java.util.List;

public interface LancamentoRepositoryQuery {

	public List<LancamentosEstatisticaPorDia> porDia(LocalDate mesRef);
	public List<LancamentosEstatisticaPorCategoria> porCategoria(LocalDate mesRef);

	public Page<Lancamento> filtrar(LancamentoFilter lancamentoFilter, Pageable pageable);
	public Page<LancamentoProjection> resumir(LancamentoFilter lancamentoFilter, Pageable pageable);

}