package me.umbrella.grana.api.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import me.umbrella.grana.api.model.Pessoa;
import me.umbrella.grana.api.repository.PessoaRepository;

@Service
public class PessoaService {
	
	@Autowired
	private PessoaRepository pessoaRepository;
	

	public Pessoa atualizar(Long codigo, Pessoa pessoa) {
		Pessoa pessoaSalva = buscarPessoaPeloCodigo(codigo);
		
		BeanUtils.copyProperties(pessoa, pessoaSalva, "codigo");
		
		return pessoaRepository.save(pessoaSalva);
	}
	
	public void atualizarPropriedadeAtivo(Long codigo, Boolean ativo) {
		Pessoa pessoaSalva = buscarPessoaPeloCodigo(codigo);
		pessoaSalva.setAtivo(ativo);
		pessoaRepository.save(pessoaSalva);
	}
	
	
	
	public Pessoa buscarPessoaPeloCodigo(Long codigo) {
		
		Pessoa pessoaSalva = pessoaRepository.findById(codigo).orElseThrow(); 
		
		if (pessoaSalva == null) {
			throw new EmptyResultDataAccessException(1);
		}
		
		return pessoaSalva;
	}
	
}
