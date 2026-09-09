
export const environment = {
  production: true,
  apiUrl: 'http://localhost:8080',
  tokenAllowedDomains: [  /localhost:8080/ ],
  tokenDisallowedRoutes: [/\/oauth2\/token/],
  oauthCallbackUrl: 'http://grana-application.umbrella.com:8000/authorized',
  logoutRedirectToUrl: 'http://grana-application.umbrella.com:8000',
  
  
};
