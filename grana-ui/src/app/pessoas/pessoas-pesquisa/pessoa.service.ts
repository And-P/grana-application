import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Pessoa } from 'src/app/core/model';


export class PessoaFiltro {
    nome?: string;
    pagina: number = 0;
    itensPorPagina = 5;
}

@Injectable()
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';
  
//   private authToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NzI1Nzc0MjUsInVzZXJfbmFtZSI6ImFkbWluQHVtYnJlbGxhLmNvbSIsImF1dGhvcml0aWVzIjpbIlJPTEVfQ0FEQVNUUkFSX0NBVEVHT1JJQSIsIlJPTEVfUEVTUVVJU0FSX1BFU1NPQSIsIlJPTEVfUkVNT1ZFUl9QRVNTT0EiLCJST0xFX0NBREFTVFJBUl9MQU5DQU1FTlRPIiwiUk9MRV9QRVNRVUlTQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUkVNT1ZFUl9MQU5DQU1FTlRPIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfQ0FURUdPUklBIl0sImp0aSI6InZfZVJBaHh5cEh2eVp5UHlrX0RIckM1VXZkNCIsImNsaWVudF9pZCI6ImFuZ3VsYXIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.lg-YwntStwgXp4ZthLR9IYiQhWOImuwmkj1GbsmuqO0';  
  
  
  constructor(private http: HttpClient) {  }
  
  
  pesquisar(filtro: PessoaFiltro): Promise<any> {
  
    //   const headers = new HttpHeaders().append('Authorization', this.authToken);
      let params = new HttpParams()
                          .set('page', filtro.pagina.toString())
                          .set('size', filtro.itensPorPagina.toString())
                          .set('nome', filtro.nome?.toString() ?? '' );
  
  
                //   .get<any>(`${this.pessoasUrl}`, { headers, params })
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
    //   const headers = new HttpHeaders().append('Authorization', this.authToken);
                    // .get(`${this.pessoasUrl}`, { headers })
      return this.http.get(`${this.pessoasUrl}`)
                      .toPromise()
                      .then((response: any) => response.content);
  }
  

  
  adicionar(pessoa: any): Promise<Pessoa> {
    //   const headers = new HttpHeaders().append('Authorization', this.authToken).append('Content-Type', 'application/json');
                
                    // .post<Pessoa>(`${this.pessoasUrl}`, pessoa, { headers })
      return this.http.post<Pessoa>(`${this.pessoasUrl}`, pessoa)
              .toPromise()
              .then((response: any) => response);
  } 

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    //   const headers = new HttpHeaders().append('Authorization', this.authToken).append('Content-Type', 'application/json');
                    // .put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa, { headers })
      return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa)
                      .toPromise()
                      .then((response: any) => response);
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    //   const headers = new HttpHeaders().append('Authorization', this.authToken).append('Content-Type', 'application/json');
                    // .get(`${this.pessoasUrl}/${codigo}`, { headers })
      return this.http.get(`${this.pessoasUrl}/${codigo}`)
                      .toPromise()
                      .then((response: any) => {
          
                            return response;
                      });
  } 

  excluir(codigo: number): Promise<void | null> {
    //   const headers = new HttpHeaders().append('Authorization', this.authToken);
                    // .delete<void>(`${this.pessoasUrl}/${codigo}`, { headers })
      return this.http.delete<void>(`${this.pessoasUrl}/${codigo}`)
                      .toPromise();
  }
  
  mudarStatus(codigo: number, status: boolean): Promise<void> {
    //   const headers = new HttpHeaders().append('Authorization', this.authToken).append('Content-Type', 'application/json');
                    //  .put<void>(`${this.pessoasUrl}/${codigo}/ativo`, status, { headers })
      return this.http.put<void>(`${this.pessoasUrl}/${codigo}/ativo`, status)
                      .toPromise();
  }

}
