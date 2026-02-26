import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PessoaCadastro } from 'src/app/core/model';


export class PessoaFiltro {
    nome?: string;
    pagina: number = 0;
    itensPorPagina = 5;
}

@Injectable({
    providedIn: 'root'
})
export class PessoaService {

    pessoasUrl = 'http://localhost:8080/pessoas';

    private authToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NzIwNzA0NTEsInVzZXJfbmFtZSI6ImFkbWluQHVtYnJlbGxhLmNvbSIsImF1dGhvcml0aWVzIjpbIlJPTEVfQ0FEQVNUUkFSX0NBVEVHT1JJQSIsIlJPTEVfUEVTUVVJU0FSX1BFU1NPQSIsIlJPTEVfUkVNT1ZFUl9QRVNTT0EiLCJST0xFX0NBREFTVFJBUl9MQU5DQU1FTlRPIiwiUk9MRV9QRVNRVUlTQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUkVNT1ZFUl9MQU5DQU1FTlRPIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfQ0FURUdPUklBIl0sImp0aSI6IjYwelFCR2ZQZTIzTlN6b2VUSEJiWm53T05hWSIsImNsaWVudF9pZCI6ImFuZ3VsYXIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.TEgJq5zhRmF7mAATuEuLeIXrfv28uvd6b_r1rlIfhWM';  
    
    
    constructor(private http: HttpClient) {  }

   
    pesquisar(filtro: PessoaFiltro): Promise<any> {

        const headers = new HttpHeaders().append('Authorization', this.authToken);
        let params = new HttpParams()
                            .set('page', filtro.pagina.toString())
                            .set('size', filtro.itensPorPagina.toString())
                            .set('nome', filtro.nome?.toString() ?? '' );


        return this.http
                    .get<any>(`${this.pessoasUrl}`, { headers, params })
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
        const headers = new HttpHeaders()
                              .append('Authorization', this.authToken);

        return this.http
                    .get(`${this.pessoasUrl}`, { headers })
                    .toPromise()
                    .then((response: any) => response.content);
    }

    excluir(codigo: number): Promise<void | null> {
      const headers = new HttpHeaders().append('Authorization', this.authToken);

      return this.http.delete<void>(`${this.pessoasUrl}/${codigo}`, { headers })
               .toPromise()
               .then(() => null);
    }

    mudarStatus(codigo: number, status: boolean): Promise<void> {
      const headers = new HttpHeaders().append('Authorization', this.authToken).append('Content-Type', 'application/json');

      return this.http.put<void>(`${this.pessoasUrl}/${codigo}/ativo`, status, { headers })
               .toPromise();
    }

    salvar(pessoa: any): Promise<any> {
      const headers = new HttpHeaders().append('Authorization', this.authToken).append('Content-Type', 'application/json');

      return this.http.post<PessoaCadastro>(`${this.pessoasUrl}`, pessoa, { headers })
               .toPromise();
    } 


}
