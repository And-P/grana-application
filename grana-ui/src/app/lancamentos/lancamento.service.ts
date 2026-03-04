import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DatePipe } from '@angular/common';
import { Lancamento } from '../core/model';

// import 'rxjs/add/operator/toPromise';

export class FiltroLancamentosObject {
  descricao: string = '';
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  // private authToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NzI1Nzc0MjUsInVzZXJfbmFtZSI6ImFkbWluQHVtYnJlbGxhLmNvbSIsImF1dGhvcml0aWVzIjpbIlJPTEVfQ0FEQVNUUkFSX0NBVEVHT1JJQSIsIlJPTEVfUEVTUVVJU0FSX1BFU1NPQSIsIlJPTEVfUkVNT1ZFUl9QRVNTT0EiLCJST0xFX0NBREFTVFJBUl9MQU5DQU1FTlRPIiwiUk9MRV9QRVNRVUlTQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUkVNT1ZFUl9MQU5DQU1FTlRPIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfQ0FURUdPUklBIl0sImp0aSI6InZfZVJBaHh5cEh2eVp5UHlrX0RIckM1VXZkNCIsImNsaWVudF9pZCI6ImFuZ3VsYXIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.lg-YwntStwgXp4ZthLR9IYiQhWOImuwmkj1GbsmuqO0';  

  datePipe = new DatePipe('pt-BR');

  
  constructor(private http: HttpClient) {  }
  
  
  pesquisar(filtro: FiltroLancamentosObject): Promise<any> {

      // const headers = new HttpHeaders().append('Authorization', this.authToken);
      let params = new HttpParams();

      if (filtro.descricao) {
          params = params.set('descricao', filtro.descricao);
      }

      if (filtro.dataVencimentoInicio) {
        params = params.set('dataVencimentoDe', this.datePipe.transform(filtro.dataVencimentoInicio, 'yyyy-MM-dd')!);  
      }

      if (filtro.dataVencimentoFim) {
          params = params.set('dataVencimentoAte', this.datePipe.transform(filtro.dataVencimentoFim, 'yyyy-MM-dd')!);
      }

      params = params.set('page', filtro.pagina.toString());
      params = params.set('size', filtro.itensPorPagina.toString());

      // return this.http.get<any>(`${this.lancamentosUrl}?resumo`, { headers, params })
      return this.http.get<any>(`${this.lancamentosUrl}?resumo`, { params })
                      .toPromise()
                      .then( (response) => {
                                const responseJson = response;
                                const lancamentos = responseJson.content;
                      
                              const resultado = {
                                lancamentos: lancamentos,
                                total: responseJson.totalElements,
                              };
                            
                          return resultado;  
                      });     
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento | undefined> {
    // const headers = new HttpHeaders().append('Authorization', this.authToken).append('Content-Type', 'application/json');

    if (lancamento.dataVencimento) {
      lancamento.dataVencimento = this.datePipe.transform(lancamento.dataVencimento, 'dd/MM/yyyy') as any;
    }

    if (lancamento.dataPagamento) {
      lancamento.dataPagamento = this.datePipe.transform(lancamento.dataPagamento, 'dd/MM/yyyy') as any;
    }

    // return this.http.post<Lancamento>(this.lancamentosUrl, lancamento, { headers }).toPromise();
    return this.http.post<Lancamento>(this.lancamentosUrl, lancamento).toPromise();
  }  

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    // const headers = new HttpHeaders().append('Authorization', this.authToken).append('Content-Type', 'application/json');

    if (lancamento.dataVencimento) {
      lancamento.dataVencimento = this.datePipe.transform(lancamento.dataVencimento, 'dd/MM/yyyy') as any;
    }

    if (lancamento.dataPagamento) {
      lancamento.dataPagamento = this.datePipe.transform(lancamento.dataPagamento, 'dd/MM/yyyy') as any;
    }

    // return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento, { headers })
    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento)
                    .toPromise()
                    .then((response: any) => {
                      this.converterStringsParaDatas([response]);
                      return response;
                    });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    // const headers = new HttpHeaders().append('Authorization', this.authToken).append('Content-Type', 'application/json');

    // return this.http.get(`${this.lancamentosUrl}/${codigo}`, { headers })
    return this.http.get(`${this.lancamentosUrl}/${codigo}`)
                    .toPromise()
                    .then((response: any) => {
        
                      this.converterStringsParaDatas([response]);

            return response;
      });
  }

  excluir(codigo: number): Promise<void | null> {
    // const headers = new HttpHeaders().append('Authorization', this.authToken);

    // return this.http.delete<void>(`${this.lancamentosUrl}/${codigo}`, { headers })
    return this.http.delete<void>(`${this.lancamentosUrl}/${codigo}`)
                    .toPromise()
                    .then(() => null);
  }  


  private converterStringsParaDatas(lancamentos: Lancamento[]): void {
    for (const lancamento of lancamentos) {
      let offset = new Date().getTimezoneOffset() * 60000;

      lancamento.dataVencimento = new Date(new Date(lancamento.dataVencimento!).getTime() + offset);

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = new Date(new Date(lancamento.dataPagamento!).getTime() + offset);
      }
    }
  }

}