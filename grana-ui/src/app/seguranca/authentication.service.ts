import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';
import * as CryptoJS from 'crypto-js';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // Variáveis
  oauthTokenUrl = environment.apiUrl + '/oauth2/token';
  tokensRevokeUrl = environment.apiUrl + '/tokens/revoke';
  oauthAuthorizeUrl = environment.apiUrl + '/oauth2/authorize';
  jwtPayload: any;

  constructor( private http: HttpClient,
               private jwtHelper: JwtHelperService ) { 
    
      this.carregarToken();
  }

  public carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

  // HttpInterceptor: o access_token é inválido quando não existe ou expirou
  public isAccessTokenInvalido() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  login() {
    const clientId = 'angular'
    const responseType = 'code'
    const scope = 'read+write'
    
    const state = this.gerarStringAleatoria(40);
    const codeVerifier = this.gerarStringAleatoria(128);

    localStorage.setItem('state', state);
    localStorage.setItem('codeVerifier', codeVerifier);

    const challengeMethod = 'S256';
    const codeChallenge = CryptoJS.SHA256(codeVerifier)
                                  .toString(CryptoJS.enc.Base64)
                                  .replace(/\+/g, "-")
                                  .replace(/\//g, "_")
                                  .replace(/=+$/, "");

    const redirectURI = encodeURIComponent(environment.oauthCallbackUrl);


    const params = [
      'response_type=' + responseType,
      'client_id=' + clientId,
      'scope=' + scope,
      'code_challenge=' + codeChallenge,
      'code_challenge_method=' + challengeMethod,
      'state=' + state,
      'redirect_uri=' + redirectURI 
    ]

    window.location.href = this.oauthAuthorizeUrl + '?' +  params.join('&');
  }

  // Obtendo novo access_token com o code recebido no callback
  novoAccessTokenComCode(code: string, state: string): Promise<any> {

    const stateSalvo = localStorage.getItem('state');

    if (stateSalvo !== state) {
      return Promise.reject(null);
    }

    const codeVerifier = localStorage.getItem('codeVerifier')!;

    let headers = new HttpHeaders();
          headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
          headers = headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEBy');

    const payload = new HttpParams()
          .append('grant_type', 'authorization_code')
          .append('code', code)
          .append('redirect_uri', environment.oauthCallbackUrl)
          .append('code_verifier', codeVerifier);

    return this.http.post<any>(this.oauthTokenUrl, payload, { headers, withCredentials: true })
      .toPromise()
      .then((response: any) => {
        this.armazenarToken(response['access_token']);
        this.armazenarRefreshToken(response['refresh_token']);

        localStorage.removeItem('state');
        localStorage.removeItem('codeVerifier');
        
        return Promise.resolve(null);
      })
      .catch((response: any) => {
        console.error('Erro ao gerar token com o code.', response);
        return Promise.resolve();
      });

  }

  //HttpInterceptor: renovar o access_token automaticamente caso esteja expirado
  novoAccessToken(): Promise<void> {
    
    const payload = new HttpParams()
      .append('grant_type', 'refresh_token')
      .append('refresh_token', localStorage.getItem('refreshToken')!);

    let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers = headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEBy');  

    return this.http.post<any>(this.oauthTokenUrl, payload, { headers, withCredentials: true } )
      .toPromise()
      .then((response: any) => { 
        this.armazenarToken(response['access_token']);
        this.armazenarRefreshToken(response['refresh_token']);
        
        return Promise.resolve();
      })
      .catch(erro => {
        console.error('Erro ao renovar token.', erro);
        return Promise.resolve();
      });
  }

  // Verifica Permissões Usuário
  public temAlgumaPermissao(roles: any) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

  // Verifica Permissões Usuário / Componentes e Rotas
  public temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }
  
  logout() {
    this.limparAccessToken();
    localStorage.clear();

    window.location.href = environment.apiUrl + '/logout?returnTo=' + environment.logoutRedirectToUrl;
  }
  
  // Limpa Access-Token do navegador e o field jwtPayload
  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  // Token Opaco
  private armazenarRefreshToken(refreshToken: string) {
    localStorage.setItem('refreshToken', refreshToken);
  }

  private gerarStringAleatoria(tamanho: number) {
    let resultado = '';
    //Chars que são URL safe
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < tamanho; i++) {
      resultado += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return resultado;
  }

}
