package me.umbrella.grana.api.service;

import me.umbrella.grana.api.dto.LancamentoEstatisticaPorPessoa;
import me.umbrella.grana.api.mail.Mailer;
import me.umbrella.grana.api.model.Usuario;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import me.umbrella.grana.api.model.Lancamento;
import me.umbrella.grana.api.model.Pessoa;
import me.umbrella.grana.api.repository.LancamentoRepository;
import me.umbrella.grana.api.repository.PessoaRepository;
import me.umbrella.grana.api.service.exception.PessoaInexistenteOuInativaException;

import java.io.InputStream;
import java.time.LocalDate;
import java.util.*;
import java.sql.Date;

@Service
public class LancamentoService {

	private static final String USUARIO_ROLE = "ROLE_PESQUISAR_LANCAMENTO";

	private static final Logger LOGGER = LoggerFactory.getLogger(LancamentoService.class);

	@Autowired
	private LancamentoRepository lancamentoRepository;

	@Autowired
	private PessoaRepository pessoaRepository;

	@Autowired
	private Mailer mailer;


//	@Scheduled(cron="0 14 14 * * *")
//	@Scheduled(fixedDelay = 1000 * 60 * 30)
	public void alertaLancamentosVencidos() {

		if(LOGGER.isDebugEnabled()) LOGGER.debug("Emails Lançamentos Vencidos");

		List<Lancamento> lancamentosVencidos = 	lancamentoRepository.findByDataVencimentoLessThanEqualAndDataPagamentoIsNull(LocalDate.now());
		List<Usuario> destinatarios = lancamentoRepository.findByPermissoesDescricao(USUARIO_ROLE);

		if(lancamentosVencidos.isEmpty()) {
			LOGGER.info("Não constam lançamentos vencidos.");
			return;
		}

		LOGGER.info("Existem {} Lançamentos Vencidos.", lancamentosVencidos.size());

		if(destinatarios.isEmpty()) {
			LOGGER.warn("Constam lançamentos vencidos sem destinatários.");
			return;
		}

		mailer.alertaDeLancamentosVencidos(lancamentosVencidos, destinatarios);

		LOGGER.info("Email de alerta concluído com sucesso");

	}

	public byte[] relatorioPorPessoa(LocalDate inicio, LocalDate fim) throws Exception {
		List<LancamentoEstatisticaPorPessoa> dados = lancamentoRepository.porPessoa(inicio, fim);

		Map<String, Object> parametros = new HashMap<>();
		parametros.put("DT_INICIO", Date.valueOf(inicio));
		parametros.put("DT_FIM", Date.valueOf(fim));
		parametros.put("REPORT_LOCALE", new Locale("pt", "BR"));

		InputStream inputStream = this.getClass().getResourceAsStream(
				"/relatorios/LancamentosPorPessoa.jasper");

		JasperPrint jasperPrint = JasperFillManager.fillReport(inputStream, parametros, new JRBeanCollectionDataSource(dados));

		return JasperExportManager.exportReportToPdf(jasperPrint);
	}

	public Lancamento salvar(Lancamento lancamento) {
		Pessoa pessoa = pessoaRepository.getReferenceById(lancamento.getPessoa().getCodigo());
		if (pessoa == null || pessoa.isInativo()) {
			throw new PessoaInexistenteOuInativaException();
		}
		
		return lancamentoRepository.save(lancamento);
	}

	public Lancamento atualizar(Long codigo, Lancamento lancamento) {
		Lancamento lancamentoSalvo = buscarLancamentoExistente(codigo);
		if (!lancamento.getPessoa().equals(lancamentoSalvo.getPessoa())) {
			validarPessoa(lancamento);
		}

		BeanUtils.copyProperties(lancamento, lancamentoSalvo, "codigo");

		return lancamentoRepository.save(lancamentoSalvo);
	}

	private void validarPessoa(Lancamento lancamento) {
		Optional<Pessoa> pessoa = null;
		if (lancamento.getPessoa().getCodigo() != null) {
			pessoa = pessoaRepository.findById(lancamento.getPessoa().getCodigo());
		}

		if (pessoa.isEmpty() || pessoa.get().isInativo()) {
			throw new PessoaInexistenteOuInativaException();
		}
	}

	private Lancamento buscarLancamentoExistente(Long codigo) {
/* 		Optional<Lancamento> lancamentoSalvo = lancamentoRepository.findById(codigo);
		if (lancamentoSalvo.isEmpty()) {
			throw new IllegalArgumentException();
		} */
		return lancamentoRepository.findById(codigo).orElseThrow(() -> new IllegalArgumentException());
	}
	
}
