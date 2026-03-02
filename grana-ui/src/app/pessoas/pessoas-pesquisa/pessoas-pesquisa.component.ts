import { Component, ViewChild } from '@angular/core';

import { LazyLoadEvent, MessageService, ConfirmationService  } from 'primeng/api';
import { Table } from 'primeng/table';

import { PessoaService, PessoaFiltro } from './pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';


@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  // pessoas = [
  //   { nome: 'André Rei', cidade: 'São Paulo', estado: 'SP', status: true},
  //   { nome: 'Marcela Camilo', cidade: 'São Paulo', estado: 'SP', status: false},
  //   { nome: 'Joana Benedeti', cidade: 'Niterói', estado: 'RJ', status: true},
  //   { nome: 'Andreia Rabelo', cidade: 'Recife', estado: 'PE', status: true},
  //   { nome: 'Camila Ribeiro', cidade: 'São Paulo', estado: 'SP', status: false},
  //   { nome: 'Adriana Gonsalvez', cidade: 'Recife', estado: 'PE', status: true},
  //   { nome: 'Marcia Gomes', cidade: 'Belo Horizonte', estado: 'MG', status: true},
  //   { nome: 'Fernanda Broma', cidade: 'São Paulo', estado: 'SP', status: false},
  //   { nome: 'Isis Scamparini', cidade: 'Belo Horizonte', estado: 'MG', status: true},
  //   { nome: 'Thais Goes', cidade: 'Niterói', estado: 'RJ', status: true}
  // ];

  // pessoas = [];
  pessoas: any[] = [];
  
  totalRegistros = 0;

  filtro = new PessoaFiltro(); 
  
  @ViewChild('tabela') 
    grid!: Table;

  constructor( private pessoaService: PessoaService,
               private messageService: MessageService,
               private confirmationService: ConfirmationService,
               private errorHandlerService: ErrorHandlerService ) { }



  pesquisar(pagina: number = 0): void { 

    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
                      .then((dados: any) => {
                        this.pessoas = dados.pessoas;
                        this.totalRegistros = dados.total;
                          // console.log(dados);
                      })
                      .catch( error => this.errorHandlerService.handle(error) );
  
  }

  mudaPagina(event: LazyLoadEvent) {
      let pagina = event!.first! / event!.rows!;
      this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any): void {
    this.confirmationService.confirm({
      message: 'Deseja excluír permanentemente ?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
                      .then(() => {

                            this.grid.reset();

                            this.messageService.add({ severity: 'success', detail: 'Pessoa excluída com sucesso!' });
                      
                      })
                      .catch( error => this.errorHandlerService.handle(error) );
  }

  mudarStatus(pessoa: any): void {
    const novoStatus = !pessoa.ativo;

    this.pessoaService.mudarStatus(pessoa.codigo, novoStatus)
                      .then(() => {
     
                        const acao = novoStatus ? 'ativada' : 'desativada';
     
                        pessoa.ativo = novoStatus;
                      
                        this.messageService.add({ severity: 'success', detail: `Pessoa ${acao} com sucesso!` });
     
                      })
                      .catch( error => this.errorHandlerService.handle(error) );
  }

}
