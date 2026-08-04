package me.umbrella.grana.api.config.property;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;


@Component
@ConfigurationProperties("grana-api-property")
public class GranaApiProperty {

	private String origemPermitida = "http://localhost:8000";

	private final Seguranca seguranca = new Seguranca();

	private final Mail mail = new Mail();


	public Mail getMail() {
		return mail;
	}

	public Seguranca getSeguranca() {
		return seguranca;
	}
	
	public String getOrigemPermitida() {
		return origemPermitida;
	}

	public void setOrigemPermitida(String origemPermitida) {
		this.origemPermitida = origemPermitida;
	}

	// CLASS
	public static class Seguranca {
		
		private boolean enableHttps;
	
		public boolean isEnableHttps() {
			return enableHttps;
		}
	
		public void setEnableHttps(boolean enableHttps) {
			this.enableHttps = enableHttps;
		}
	
	}

	// CLASS
	public static class Mail {

		private String host;
		private Integer port;
		private String username;
		private String password;


		public String getHost() {
			return host;
		}

		public void setHost(String host) {
			this.host = host;
		}

		public Integer getPort() {
			return port;
		}

		public void setPort(Integer port) {
			this.port = port;
		}

		public String getUsername() {
			return username;
		}

		public void setUsername(String username) {
			this.username = username;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}
	}

}
