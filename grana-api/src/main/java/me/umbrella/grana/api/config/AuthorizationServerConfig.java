package me.umbrella.grana.api.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;

@SuppressWarnings("deprecation")
@Configuration
@EnableAuthorizationServer
public class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {
	
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserDetailsService userDetailsService;
	

	@Override
	public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
		
		clients.inMemory()
				.withClient("angular")
				.secret("$2a$10$9NKRicZMhK.Ppv/3DiA5sO/5L3VmidE9NTmCqVkaxLYdDjqixM.9.") // "@ngul@r"
				.scopes("read", "write")
				.authorizedGrantTypes("password", "refresh_token")
				.accessTokenValiditySeconds(10_300)
				.refreshTokenValiditySeconds(10_3600 * 24);
		/*
		 * .and() .withClient("android")
		 * .secret("$2a$10$vnehmKodyVKR75M0tBNJAeLQ6qYTePmqKXmOw.6VdBEx2eRGQuB7q") //
		 * "@ndr0id" .scopes("read") .authorizedGrantTypes("password", "refresh_token")
		 * .accessTokenValiditySeconds(300) .refreshTokenValiditySeconds(3600 * 24);
		 */
	}

	@Override
	public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
		
		endpoints
			.authenticationManager(authenticationManager)
			.accessTokenConverter(accessTokenConverter())
			.tokenStore(tokenStore())
			.userDetailsService(userDetailsService)
			.reuseRefreshTokens(false);
	}
	
	@Bean
	public JwtAccessTokenConverter accessTokenConverter() {
		JwtAccessTokenConverter accessTokenConverter = new JwtAccessTokenConverter();

		accessTokenConverter.setSigningKey("3032885ba9cd6621bcc4e7d6b6c35c2b");

		return accessTokenConverter;
	}

	@Bean
	public TokenStore tokenStore() {
		return new JwtTokenStore(accessTokenConverter());
	}

}













