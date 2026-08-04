package me.umbrella.grana.api.config;

import me.umbrella.grana.api.config.property.GranaApiProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class MailConfig {

    @Autowired
    private GranaApiProperty property;

    @Bean
    public JavaMailSender mailSender() {

        Properties properties = new Properties();

        properties.put("mail.transport.protocol", "smtp");
        properties.put("mail.smtp.auth", true);
        properties.put("mail.smtp.starttls.enable", true);
        properties.put("mail.smtp.connectiontimeout", 10000);

        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

        mailSender.setJavaMailProperties(properties);
        mailSender.setHost(property.getMail().getHost());
        mailSender.setPort(property.getMail().getPort());
        mailSender.setUsername(property.getMail().getUsername());
        mailSender.setPassword(property.getMail().getUsername());

        return mailSender;
    }

}
