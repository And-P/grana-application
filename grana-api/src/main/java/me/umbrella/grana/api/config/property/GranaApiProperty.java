package me.umbrella.grana.api.config.property;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
@ConfigurationProperties("grana-api-property")
public class GranaApiProperty {

	private String origemPermitida = "http://localhost:8000";

	private final Seguranca seguranca = new Seguranca();

	private final Mail mail = new Mail();

	private final AwsS3 awsS3 = new AwsS3();


	public String getOrigemPermitida() {
		return origemPermitida;
	}

	public Seguranca getSeguranca() {
		return seguranca;
	}

	public Mail getMail() {
		return mail;
	}

	public AwsS3 getAwsS3() {
		return awsS3;
	}

	public void setOrigemPermitida(String origemPermitida) {
		this.origemPermitida = origemPermitida;
	}


	// CLASS
	public static class AwsS3 {

		private String accessKeyId;
		private String secretAccessKey;
		private String bucket = "grana-api-arquivos";


		public String getAccessKeyId() {
			return accessKeyId;
		}

		public void setAccessKeyId(String accessKeyId) {
			this.accessKeyId = accessKeyId;
		}

		public String getSecretAccessKey() {
			return secretAccessKey;
		}

		public void setSecretAccessKey(String secretAccessKey) {
			this.secretAccessKey = secretAccessKey;
		}


		public String getBucket() {
			return bucket;
		}
	}

	// CLASS
/*
	public static class Seguranca {
		
		private boolean enableHttps;
	
		public boolean isEnableHttps() {
			return enableHttps;
		}
	
		public void setEnableHttps(boolean enableHttps) {
			this.enableHttps = enableHttps;
		}
	}
*/

	public static class Seguranca {

		private List<String> redirectsPermitidos;
		private String authServerUrl;

		public List<String> getRedirectsPermitidos() {
			return redirectsPermitidos;
		}

		public void setRedirectsPermitidos(List<String> redirectsPermitidos) {
			this.redirectsPermitidos = redirectsPermitidos;
		}

		public String getAuthServerUrl() {
			return authServerUrl;
		}

		public void setAuthServerUrl(String authServerUrl) {
			this.authServerUrl = authServerUrl;
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
