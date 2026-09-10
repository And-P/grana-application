import { Component, ViewChild } from '@angular/core';

import { LazyLoadEvent, MessageService, ConfirmationService  } from 'primeng/api';
import { Table } from 'primeng/table';

import { PessoasService, PessoaFiltro } from '../pessoas.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthenticationService } from 'src/app/seguranca/authentication.service';


@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  // pessoas = [
  //   { nome: 'André Rei', cidade: 'São Paulo', estado: 'SP', status: true},
  //   { nome: 'Marcela Camilo', cidade: 'São Paulo', estado: 'SP', status: false},
  // ];

  pessoas: any[] = [];
  
  totalRegistros = 0;

  filtro = new PessoaFiltro(); 
  
  @ViewChild('tabela') 
    grid!: Table;

  constructor( private pessoaService: PessoasService,
               private messageService: MessageService,
               private confirmationService: ConfirmationService,
               private errorHandlerService: ErrorHandlerService,
              private auth: AuthenticationService ) { }



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

  naoTemPermissao(permissao: string) {
    return !this.auth.temPermissao(permissao);
  }

}
