package me.umbrella.grana.api.resource;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import me.umbrella.grana.api.config.property.GranaApiProperty;

@RestController
@RequestMapping("/tokens")
public class TokenRevokeResource {
	
	@Autowired
	private GranaApiProperty configProperty;
	
	
	@DeleteMapping("/revoke")
	public void revoke(HttpServletRequest req, HttpServletResponse resp) {
		Cookie cookie = new Cookie("refreshToken", null);
			   cookie.setHttpOnly(true);
			   cookie.setSecure(configProperty.getSeguranca().isEnableHttps());
			   cookie.setPath(req.getContextPath() + "/oauth/token");
			   cookie.setMaxAge(0);
		
		resp.addCookie(cookie);
		resp.setStatus(HttpStatus.NO_CONTENT.value());
	}
	
}
