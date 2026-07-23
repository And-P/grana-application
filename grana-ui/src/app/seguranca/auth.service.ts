import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // Variáveis
  oauthTokenUrl = environment.apiUrl + '/oauth/token';
  tokensRevokeUrl = environment.apiUrl + '/tokens/revoke';
  jwtPayload: any;

  // Construtor
  constructor( private http: HttpClient,
               private jwtHelper: JwtHelperService ) { 
    
      this.carregarToken();
  }

  // Métodos
  public carregarToken() {
    const token = localStorage.getItem('token');
    console.log('CarregarToken no jwtPayload => ', this.jwtPayload);
    if (token) {
      this.armazenarToken(token);
    }
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  // Usado no HttpInterceptor: o access_token é inválido quando não existe ou expirou
  public isAccessTokenInvalido() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }


  login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEBy');
    
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true } )
      .toPromise()
      .then((response: any) => {
        this.armazenarToken(response['access_token']);
      })
      .catch(response => {
        if (response.status === 400) {
          if (response.error.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida!');
          }
        }

        return Promise.reject(response);
      });
  }

  //Usado no HttpInterceptor para renovar o access_token automaticamente caso esteja expirado
  novoAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEBy');
    
    const body = `grant_type=refresh_token`;

    return this.http.post<any>(this.oauthTokenUrl, body, { headers, withCredentials: true } )
      .toPromise()
      .then((response: any) => { 
        this.armazenarToken(response['access_token']);
        
        return Promise.resolve();
      })
      .catch(erro => {
        return Promise.resolve();
      });
  }

  
  
  // Verificando Permissões do usuário logado para acessar rotas
  // Verifica se o usuário tem alguma das permissões para acessar determinada rota.
  public temAlgumaPermissao(roles: any) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

  // Verifica Permissões do usuário logado para acessar componentes e rotas
  public temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  
  

  // Desconectando o usuário 
  logout() {
    return this.http.delete(this.tokensRevokeUrl, { withCredentials: true })
      .toPromise()  
      .then(() => { this.limparAccessToken(); });
  }
  
  // Limpa o Access Token do navegador do usuário e a propriedade jwtPayload
  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }
  

}
