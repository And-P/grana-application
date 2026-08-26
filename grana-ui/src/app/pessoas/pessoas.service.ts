import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Pessoa } from 'src/app/core/pessoa.model';
import { Estado } from 'src/app/core/estado.model';
import { Cidade } from 'src/app/core/cidade.model';


export class PessoaFiltro {
    nome?: string;
    pagina: number = 0;
    itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  pessoasUrl: string;
  cidadesUrl: string;
  estadosUrl: string;
  
  
  constructor(private http: HttpClient) {  
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
    this.cidadesUrl = `${environment.apiUrl}/cidades`;
    this.estadosUrl = `${environment.apiUrl}/estados`;
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




  // Método para listar todos os estados
  listarEstados(): Promise<Estado[]> {
      return this.http.get<any>(this.estadosUrl).toPromise();
  }

  // Método para pesquisar cidades com base no código do estado
  pesquisarCidades(codigo_estado: number): Promise<Cidade[]> {
      const params = new HttpParams().set('codigo_estado', codigo_estado);
  
      return this.http.get<any>(this.cidadesUrl, { params }).toPromise();
  }

}
