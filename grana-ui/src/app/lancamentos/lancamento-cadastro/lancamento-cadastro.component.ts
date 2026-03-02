import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { MessageService } from 'primeng/api';

import { Lancamento } from 'src/app/core/model';
import { LancamentoService } from '../lancamento.service';
import { PessoaService } from './../../pessoas/pessoas-pesquisa/pessoa.service';
import { CategoriaService } from '../../categorias/categoria.service';
import { MessageComponent } from '../../shared/message/message.component';
import { ErrorHandlerService } from './../../core/error-handler.service';


@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  // categorias = [
  //   { label: 'Alimentação', value: 1 },
  //   { label: 'Transporte', value: 2 }
  // ];
  categorias: any[]  = [];

  // pessoas = [
  //   { label: 'João Gilberto', value: 1 },
  //   { label: 'Maria Bethânia', value: 2 },
  //   { label: 'Francisco Buarque', value: 3 },
  //   { label: 'Milton Nascimento', value: 4 },
  // ];
  pessoas: any[] = [];

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  lancamento = new Lancamento();


  constructor( private categoriaService: CategoriaService,
               private pessoaService: PessoaService,
               private lancamentoService: LancamentoService,
               private messageService: MessageService,
               private errorHandlerService: ErrorHandlerService,
               private route: ActivatedRoute,
               private router: Router,
               private title: Title ) { }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }  

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
                          .then(lancamento => {
                            this.lancamento = lancamento;
                            this.atualizarTitulo();
                          })
                          .catch(error => this.errorHandlerService.handle(error));
  }

  buscarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map((c: any) => ({ label: c.nome, value: c.codigo }));
      })
      .catch(error => this.errorHandlerService.handle(error));
  } 

  buscarPessoas() {
    return this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas.map((p: any) => ({ label: p.nome, value: p.codigo }));
      })
      .catch(error => this.errorHandlerService.handle(error));
  } 

  salvar(form: NgForm){
    if(this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.salvarLancamento(form);
    }
  }


  salvarLancamento(form: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
                          .then(lancamentoNovo => {
                            this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' });
                          
                              // form.reset();
                              // this.lancamento = new Lancamento();
                              if (lancamentoNovo) {
                                this.router.navigate(['/lancamentos', lancamentoNovo.codigo]);
                              }
                          })
                          .catch(error => this.errorHandlerService.handle(error));
  }  

  atualizarLancamento(form: NgForm) {
    this.lancamentoService.atualizar(this.lancamento)
                          .then(lancamento => {
                            this.messageService.add({ severity: 'success', detail: 'Lançamento atualizado com sucesso!' });
                            
                            this.lancamento = lancamento;
                            this.atualizarTitulo();
                            

                          })
                          .catch(error => this.errorHandlerService.handle(error));
  }

  novo(form: NgForm) {

    form.reset();

    setTimeout(() => {
      this.lancamento = new Lancamento();
    }, 1);

    this.router.navigate(['/lancamentos/novo'])

  }
  
  atualizarTitulo() {
    this.title.setTitle(this.editando ? 'Edição de lançamento' : 'Cadastro de lançamento'); 
  }

  
  ngOnInit() {
    
    const codigoLancamento = this.route.snapshot.params['codigo'];

    this.title.setTitle('Cadastro de lançamento');

    if (codigoLancamento && codigoLancamento !== 'cadastro') {
      this.carregarLancamento(codigoLancamento);
    }

    this.buscarCategorias();
    this.buscarPessoas();
  }

}
