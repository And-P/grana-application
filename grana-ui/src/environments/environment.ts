
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  tokenAllowedDomains: [/localhost:8080/],
  tokenDisallowedRoutes: [/\/oauth2\/token/],
  logoutRedirectToUrl: 'http://grana-application.umbrella.com:8000',
  oauthCallbackUrl: 'http://grana-application.umbrella.com:8000/authorized',
};

