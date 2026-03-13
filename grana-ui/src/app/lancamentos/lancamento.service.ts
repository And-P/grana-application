import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DatePipe } from '@angular/common';
import { Lancamento } from '../core/model';
import { environment } from 'src/environments/environment';


export class FiltroLancamentosObject {
  descricao: string = '';
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class LancamentoService {

  lancamentosUrl: string;

  datePipe = new DatePipe('pt-BR');

  
  constructor(private http: HttpClient) { 
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
   }
  
  
  pesquisar(filtro: FiltroLancamentosObject): Promise<any> {

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

    if (lancamento.dataVencimento) {
      lancamento.dataVencimento = this.datePipe.transform(lancamento.dataVencimento, 'dd/MM/yyyy') as any;
    }

    if (lancamento.dataPagamento) {
      lancamento.dataPagamento = this.datePipe.transform(lancamento.dataPagamento, 'dd/MM/yyyy') as any;
    }

    return this.http.post<Lancamento>(this.lancamentosUrl, lancamento).toPromise();
  }  

  atualizar(lancamento: Lancamento): Promise<Lancamento> {

    if (lancamento.dataVencimento) {
      lancamento.dataVencimento = this.datePipe.transform(lancamento.dataVencimento, 'dd/MM/yyyy') as any;
    }

    if (lancamento.dataPagamento) {
      lancamento.dataPagamento = this.datePipe.transform(lancamento.dataPagamento, 'dd/MM/yyyy') as any;
    }

    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento)
                    .toPromise()
                    .then((response: any) => {
                      this.converterStringsParaDatas([response]);
                      return response;
                    });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {

    return this.http.get(`${this.lancamentosUrl}/${codigo}`)
                    .toPromise()
                    .then((response: any) => {
        
                      this.converterStringsParaDatas([response]);

            return response;
      });
  }

  excluir(codigo: number): Promise<void | null> {

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