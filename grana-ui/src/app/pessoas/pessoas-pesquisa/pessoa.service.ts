import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Pessoa } from 'src/app/core/model';
import { environment } from 'src/environments/environment';


export class PessoaFiltro {
    nome?: string;
    pagina: number = 0;
    itensPorPagina = 5;
}

@Injectable()
export class PessoaService {

  pessoasUrl: string;
  
  
  constructor(private http: HttpClient) {  
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
  }
  
  
  pesquisar(filtro: PessoaFiltro): Promise<any> {
  
      let params = new HttpParams()
                          .set('page', filtro.pagina.toString())
                          .set('size', filtro.itensPorPagina.toString())
                          .set('nome', filtro.nome?.toString() ?? '' );
  
      return this.http.get<any>(`${this.pessoasUrl}`, { params })
                      .toPromise()
                      .then( (response : any) => {
                          const pessoas = response['content'];
                      
                          const resultado = {
                                              pessoas,
                                              total: response['totalElements']
                                          };
                                        
                          return resultado;
                      });
  }
  
  listarTodas(): Promise<any> {

      return this.http.get(`${this.pessoasUrl}`)
                      .toPromise()
                      .then((response: any) => response.content);
  }
  

  
  adicionar(pessoa: any): Promise<Pessoa> {
                
      return this.http.post<Pessoa>(`${this.pessoasUrl}`, pessoa)
              .toPromise()
              .then((response: any) => response);
  } 

  atualizar(pessoa: Pessoa): Promise<Pessoa> {

      return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa)
                      .toPromise()
                      .then((response: any) => response);
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {

      return this.http.get(`${this.pessoasUrl}/${codigo}`)
                      .toPromise()
                      .then((response: any) => {
          
                            return response;
                      });
  } 

  excluir(codigo: number): Promise<void | null> {
      
      return this.http.delete<void>(`${this.pessoasUrl}/${codigo}`)
                      .toPromise();
  }
  
  mudarStatus(codigo: number, status: boolean): Promise<void> {

      return this.http.put<void>(`${this.pessoasUrl}/${codigo}/ativo`, status)
                      .toPromise();
  }

}
