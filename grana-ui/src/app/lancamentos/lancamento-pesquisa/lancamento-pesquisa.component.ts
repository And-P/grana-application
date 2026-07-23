import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { LancamentoService, LancamentoFiltro } from './../lancamento-pesquisa/lancamento.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthenticationService } from 'src/app/seguranca/auth.service';


@Component({
  selector: 'app-lancamento-pesquisa',
  templateUrl: './lancamento-pesquisa.component.html',
  styleUrls: ['./lancamento-pesquisa.component.css']
})
export class LancamentoPesquisaComponent implements OnInit {

  filtro = new LancamentoFiltro();

  totalRegistros = 0;

  // lancamentos = [
  //   { tipo: 'DESPESA', descricao: 'Compra de pão', dataVencimento: '30/06/2017',
  //     dataPagamento: null, valor: 455, pessoa: 'Padaria Orleans' },
  //   { tipo: 'RECEITA', descricao: 'Venda de software', dataVencimento: '10/06/2017',
  //     dataPagamento: '09/06/2017', valor: 80000, pessoa: 'Atacado Brasil' },
  //   { tipo: 'DESPESA', descricao: 'Impostos', dataVencimento: '20/07/2017',
  //     dataPagamento: null, valor: 14312, pessoa: 'Ministério da Fazenda' },
  //   { tipo: 'DESPESA', descricao: 'Mensalidade de escola', dataVencimento: '05/06/2017',
  //     dataPagamento: '30/05/2017', valor: 4800, pessoa: 'Escola Abelha Rainha' },
  //   { tipo: 'RECEITA', descricao: 'Venda de carro', dataVencimento: '18/08/2017',
  //     dataPagamento: null, valor: 55000, pessoa: 'Sebastião Souza' },
  //   { tipo: 'DESPESA', descricao: 'Aluguel', dataVencimento: '10/07/2017',
  //     dataPagamento: '09/07/2017', valor: 1750, pessoa: 'Casa Nova Imóveis' },
  //   { tipo: 'DESPESA', descricao: 'Mensalidade musculação', dataVencimento: '13/07/2017',
  //     dataPagamento: null, valor: 180, pessoa: 'Academia Top' }
  // ];
  lancamentos: any[] = [];

  @ViewChild('tabela') grid!: Table;


  constructor( private lancamentoService: LancamentoService,
               private auth: AuthenticationService,
               private errorHandlerService: ErrorHandlerService,
               private messageService: MessageService,
               private confirmationService: ConfirmationService,
               private title: Title 
              ) { }


  pesquisar(pagina: number = 0): void {
    
    this.filtro.pagina = pagina;

    this.lancamentoService
        .pesquisar( this.filtro )
        .then( resultado => {
          this.lancamentos = resultado.lancamentos;
          this.totalRegistros = resultado.total;
        })
        .catch( error => this.errorHandlerService.handle(error) );

  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first! / event.rows!;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any): void {
    this.confirmationService.confirm({
      message: 'Deseja excluir permanentemente o lançamento ?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {
  this.lancamentoService.excluir(lancamento.codigo)
    .then(() => {
      if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.reset();
        }

        this.messageService.add({ severity: 'success', detail: 'Lançamento excluído com sucesso!' });
    })
  }

  naoTemPermissao(permissao: string): boolean {
    return !this.auth.temPermissao(permissao);
  }


  ngOnInit(): void {
    this.title.setTitle('Pesquisa de lançamentos');
  }

}
