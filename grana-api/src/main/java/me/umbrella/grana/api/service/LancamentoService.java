package me.umbrella.grana.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import me.umbrella.grana.api.model.Lancamento;
import me.umbrella.grana.api.model.Pessoa;
import me.umbrella.grana.api.repository.LancamentoRepository;
import me.umbrella.grana.api.repository.PessoaRepository;
import me.umbrella.grana.api.service.exception.PessoaInexistenteOuInativaException;

@Service
public class LancamentoService {
	
	@Autowired
	private PessoaRepository pessoaRepository;
	
	@Autowired 
	private LancamentoRepository lancamentoRepository;
	

	public Lancamento salvar(Lancamento lancamento) {
		Pessoa pessoa = pessoaRepository.getReferenceById(lancamento.getPessoa().getCodigo());
		if (pessoa == null || pessoa.isInativo()) {
			throw new PessoaInexistenteOuInativaException();
		}
		
		return lancamentoRepository.save(lancamento);
	}
	
}
