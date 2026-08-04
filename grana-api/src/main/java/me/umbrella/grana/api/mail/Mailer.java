package me.umbrella.grana.api.mail;

import me.umbrella.grana.api.model.Lancamento;
import me.umbrella.grana.api.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.context.event.ApplicationReadyEvent;
//import org.springframework.context.event.EventListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
//import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class Mailer {

    private static final String TEMPLATE = "mail/lancamentos-vencidos";

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine thymeleaf;

    //	@Autowired
//	private LancamentoRepository repo;
//
//	@EventListener
//	private void teste(ApplicationReadyEvent event) {
//		String template = "mail/lancamentos-vencidos";
//
//		List<Lancamento> lista = repo.findAll();
//
//		Map<String, Object> variaveis = new HashMap<>();
//		variaveis.put("lancamentos", lista);
//
//		this.enviarEmail("andrepaiva@hotmail.com",
//				         Arrays.asList("andrexpaiva@gmail.com"),
//				         "Testando", template,
//				         variaveis);
//		System.out.println("Terminado o envio de e-mail...");
//	}/

    public void alertaDeLancamentosVencidos(List<Lancamento> lancamentosVencidos,
                                            List<Usuario> destinatarios) {

        Map<String, Object> variaveis = new HashMap<>();

                            variaveis.put("lancamentos", lancamentosVencidos);

        List<String> emails = destinatarios.stream().map(Usuario::getEmail).collect(Collectors.toList());


        this.enviarEmail(
                "andrepaiva@hotmail.com",
                emails,
                "Aviso de Lançamentos Vencidos",
                TEMPLATE,
                variaveis
        );


    }

    public void enviarEmail(String remetente,
                            List<String> destinatarios,
                            String assunto,
                            String template,
                            Map<String, Object> variaveis) {

        Context context = new Context(new Locale("pt", "BR"));

        variaveis.entrySet().forEach(e -> context.setVariable(e.getKey(), e.getValue()));

        String mensagem = thymeleaf.process(template, context);

        this.enviarEmail(remetente, destinatarios, assunto, mensagem);
    }

    public void enviarEmail(String remetente,
                            List<String> destinatarios,
                            String assunto,
                            String mensagem) {

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, "UTF-8");

        try {
            mimeMessageHelper.setFrom(remetente);
            mimeMessageHelper.setTo(destinatarios.toArray(new String[destinatarios.size()]));
            mimeMessageHelper.setSubject(assunto);
            mimeMessageHelper.setText(mensagem, true);

            mailSender.send(mimeMessage);

        } catch (MessagingException e) {
            throw new RuntimeException("Problemas no envio do email.");
        }
    }

}
