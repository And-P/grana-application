package me.umbrella.grana.api.repository;

import me.umbrella.grana.api.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import me.umbrella.grana.api.model.Lancamento;
import me.umbrella.grana.api.repository.lancamento.LancamentoRepositoryQuery;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface LancamentoRepository extends JpaRepository<Lancamento, Long>, LancamentoRepositoryQuery {

    List<Lancamento> findByDataVencimentoLessThanEqualAndDataPagamentoIsNull(LocalDate data);

    List<Usuario> findByPermissoesDescricao(String permissao);

}
