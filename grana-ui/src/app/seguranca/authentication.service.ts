import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  oauthTokenUrl = environment.apiUrl + '/oauth/token';
  tokensRevokeUrl = environment.apiUrl + '/tokens/revoke';
  jwtPayload: any;


  constructor( private http: HttpClient,
               private jwtHelper: JwtHelperService ) { 
    
    this.carregarToken();

  }


  login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEBy');
    
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true } )
      .toPromise()
      .then((response: any) => {
        console.log("Login bem-sucedido ? : ", response);
        this.armazenarToken(response['access_token']);
      })
      .catch(response => {
        console.error("Erro ao fazer login: ", response);
        if (response.status === 400) {
          if (response.error.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida!');
          }
        }

        return Promise.reject(response);
      });
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    console.log(this.jwtPayload);
    // token armazenado (no navegador do usuário) no localStorage para que seja persistido mesmo após o refresh da página
    localStorage.setItem('token', token);
  }

  public carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

  // Verifica se o usuário tem a permissão para acessar determinado componente. 
  public temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  // Verifica se o usuário tem alguma das permissões para acessar determinada rota.
  public temAlgumaPermissao(roles: any) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

  novoAccessToken(): Promise<void> {

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEBy');
    
    const body = `grant_type=refresh_token`;
    

    return this.http.post<any>(this.oauthTokenUrl, body, { headers, withCredentials: true } )
      .toPromise()
      .then((response: any) => { 

        this.armazenarToken(response['access_token']);
        
        console.log("Novo access token criado:", response);
        return Promise.resolve();

      })
      .catch(erro => {
        
        console.error('Erro ao renovar token', erro);
        return Promise.resolve();

      });
  }

  // O Access Token é inválido quando ele não existe ou quando ele expirou
  public isAccessTokenInvalido() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  // Limpa o Access Token do localStorage e também a propriedade jwtPayload
  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  logout() {
    return this.http.delete(this.tokensRevokeUrl, { withCredentials: true })
      .toPromise()  
      .then(() => { this.limparAccessToken(); });
  }

}
