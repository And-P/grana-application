package me.umbrella.grana.api.repository.lancamento;

import me.umbrella.grana.api.dto.LancamentosEstatisticaPorCategoria;
import me.umbrella.grana.api.dto.LancamentosEstatisticaPorDia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.util.ObjectUtils;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import me.umbrella.grana.api.model.Categoria_;
import me.umbrella.grana.api.model.Lancamento_;
import me.umbrella.grana.api.model.Pessoa_;
import me.umbrella.grana.api.model.Lancamento;
import me.umbrella.grana.api.repository.filter.LancamentoFilter;
import me.umbrella.grana.api.repository.projection.LancamentoProjection;


public class LancamentoRepositoryImpl implements LancamentoRepositoryQuery {

	@PersistenceContext
	private EntityManager manager;


	@Override
	public List<LancamentosEstatisticaPorDia> porDia(LocalDate mesRef) {
		CriteriaBuilder criteriaBuilder = manager.getCriteriaBuilder();
		CriteriaQuery<LancamentosEstatisticaPorDia> criteriaQuery = criteriaBuilder.createQuery(LancamentosEstatisticaPorDia.class);
		Root<Lancamento> root = criteriaQuery.from(Lancamento.class);

		criteriaQuery.select(criteriaBuilder.construct(
				LancamentosEstatisticaPorDia.class,
				root.get(Lancamento_.tipo),
				root.get(Lancamento_.dataVencimento),
				criteriaBuilder.sum(root.get(Lancamento_.valor))));

		LocalDate primeiroDia = mesRef.withDayOfMonth(1);
		LocalDate ultimoDia = mesRef.withDayOfMonth(mesRef.lengthOfMonth());

		criteriaQuery.where(
				criteriaBuilder.greaterThanOrEqualTo(root.get(Lancamento_.dataVencimento), primeiroDia),
				criteriaBuilder.lessThanOrEqualTo(root.get(Lancamento_.dataVencimento), ultimoDia)
		);

		criteriaQuery.groupBy(root.get(Lancamento_.tipo), root.get(Lancamento_.dataVencimento));

		TypedQuery<LancamentosEstatisticaPorDia> typedQuery = manager.createQuery(criteriaQuery);

		return typedQuery.getResultList();
	}

	@Override
	public List<LancamentosEstatisticaPorCategoria> porCategoria(LocalDate mesRef) {
		CriteriaBuilder criteriaBuilder = manager.getCriteriaBuilder();

		CriteriaQuery<LancamentosEstatisticaPorCategoria> criteriaQuery =
				criteriaBuilder.createQuery(LancamentosEstatisticaPorCategoria.class);

		Root<Lancamento> root = criteriaQuery.from(Lancamento.class);

		criteriaQuery.select(criteriaBuilder.construct(LancamentosEstatisticaPorCategoria.class,
													   root.get(Lancamento_.categoria),
													   criteriaBuilder.sum(root.get(Lancamento_.valor))));

		LocalDate primeiroDia = mesRef.withDayOfMonth(1);
		LocalDate ultimoDia = mesRef.withDayOfMonth(mesRef.lengthOfMonth());

		criteriaQuery.where(
				criteriaBuilder.greaterThanOrEqualTo(root.get(Lancamento_.dataVencimento), primeiroDia),
				criteriaBuilder.lessThanOrEqualTo(root.get(Lancamento_.dataVencimento), ultimoDia)
		);

		criteriaQuery.groupBy(root.get(Lancamento_.categoria));

		TypedQuery<LancamentosEstatisticaPorCategoria> typedQuery = manager.createQuery(criteriaQuery);

		return typedQuery.getResultList();

	}
	
	@Override
	public Page<Lancamento> filtrar(LancamentoFilter lancamentoFilter, Pageable pageable) {
		
		CriteriaBuilder builder = manager.getCriteriaBuilder();
		
		CriteriaQuery<Lancamento> criteria = builder.createQuery(Lancamento.class);
		
		Root<Lancamento> root = criteria.from(Lancamento.class);
		
		Predicate[] predicates = criarRestricoes(lancamentoFilter, builder, root);
		
		criteria.where(predicates);
		
		TypedQuery<Lancamento> query = manager.createQuery(criteria);
		
		adicionarRestricoesDePaginacao(query, pageable);
		
		return new PageImpl<>(query.getResultList(), pageable, total(lancamentoFilter));
	}
	
	@Override
	public Page<LancamentoProjection> resumir(LancamentoFilter lancamentoFilter, Pageable pageable) {
		CriteriaBuilder builder = manager.getCriteriaBuilder();
		CriteriaQuery<LancamentoProjection> criteria = builder.createQuery(LancamentoProjection.class);
		Root<Lancamento> root = criteria.from(Lancamento.class); 
		
		criteria.select(builder.construct(LancamentoProjection.class
						, root.get(Lancamento_.codigo)
						, root.get(Lancamento_.descricao)
						, root.get(Lancamento_.dataVencimento)
						, root.get(Lancamento_.dataPagamento)
						, root.get(Lancamento_.valor)
						, root.get(Lancamento_.tipo)
						, root.get(Lancamento_.categoria).get(Categoria_.nome)
						, root.get(Lancamento_.pessoa).get(Pessoa_.nome)
						));

		Predicate[] predicates = criarRestricoes(lancamentoFilter, builder, root);
		
		criteria.where(predicates);
		
		TypedQuery<LancamentoProjection> query = manager.createQuery(criteria);
		
		adicionarRestricoesDePaginacao(query, pageable);
		
		return new PageImpl<>(query.getResultList(), pageable, total(lancamentoFilter));
	}
	

	private Predicate[] criarRestricoes(LancamentoFilter lancamentoFilter, CriteriaBuilder builder, Root<Lancamento> root) {
		List<Predicate> predicates = new ArrayList<>();

        // where descricao like %alguma-descricao%
		
		if (!ObjectUtils.isEmpty(lancamentoFilter.getDescricao())) {
			predicates.add(builder.like(
					builder.lower(root.get(Lancamento_.descricao)), "%" + lancamentoFilter.getDescricao().toLowerCase() + "%"));
		}

		if (lancamentoFilter.getDataVencimentoDe() != null) {
			predicates.add(
					builder.greaterThanOrEqualTo(root.get(Lancamento_.dataVencimento), lancamentoFilter.getDataVencimentoDe()));
		}

		if (lancamentoFilter.getDataVencimentoAte() != null) {
			predicates.add(
					builder.lessThanOrEqualTo(root.get(Lancamento_.dataVencimento), lancamentoFilter.getDataVencimentoAte()));
		}

		return predicates.toArray(new Predicate[predicates.size()]);
	}

	private void adicionarRestricoesDePaginacao(TypedQuery<?> query, Pageable pageable) {
		int paginaAtual = pageable.getPageNumber();
		int totalRegistrosPorPagina = pageable.getPageSize();
		int primeiroRegistroDaPagina = paginaAtual * totalRegistrosPorPagina;
		
		query.setFirstResult(primeiroRegistroDaPagina);
		query.setMaxResults(totalRegistrosPorPagina);
	}
	
	private Long total(LancamentoFilter lancamentoFilter) {
		CriteriaBuilder builder = manager.getCriteriaBuilder();
		CriteriaQuery<Long> criteria = builder.createQuery(Long.class);
		Root<Lancamento> root = criteria.from(Lancamento.class);
		
		Predicate[] predicates = criarRestricoes(lancamentoFilter, builder, root);
		criteria.where(predicates);
		
		criteria.select(builder.count(root));
		return manager.createQuery(criteria).getSingleResult();
	}
}
