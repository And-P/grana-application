package me.umbrella.grana.api.config.property;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;


@Component
@ConfigurationProperties("grana-api-property")
public class GranaApiProperty {
	
	private final Seguranca seguranca = new Seguranca();
	
	private String origemPermitida = "http://localhost:8000";
	
	
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

}
