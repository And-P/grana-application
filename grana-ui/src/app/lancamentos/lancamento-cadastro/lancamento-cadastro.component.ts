import { ComplementService } from '../lancamento-pesquisa/complement.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { MessageService } from 'primeng/api';

import { Lancamento } from 'src/app/core/lancamento.model';

import { LancamentoService } from '../lancamento-pesquisa/lancamento.service';
import { PessoasService } from 'src/app/pessoas/pessoas-pesquisa/pessoas.service';

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

  // lancamento = new Lancamento();
  lancamentoForm!: FormGroup;

  constructor( private complementService: ComplementService,
               private lancamentoService: LancamentoService,
               private messageService: MessageService,
               private errorHandlerService: ErrorHandlerService,
               private route: ActivatedRoute,
               private router: Router,
               private title: Title,
               private formBuilder: FormBuilder ) { }

  get editando() {
    return Boolean(this.lancamentoForm.get('codigo')?.value);
  }  

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
                          .then(lancamento => {
                            this.lancamentoForm.patchValue(lancamento);
                            this.atualizarTitulo();
                          })
                          .catch(error => this.errorHandlerService.handle(error));
  }

  buscarCategorias() {
    return this.complementService.listarCategorias()
      .then(categorias => {
        this.categorias = categorias.map((c: any) => ({ label: c.nome, value: c.codigo }));
      })
      .catch(error => this.errorHandlerService.handle(error));
  } 

  buscarPessoas() {
    return this.complementService.listarPessoas()
      .then(pessoas => {
        this.pessoas = pessoas.map((p: any) => ({ label: p.nome, value: p.codigo }));
      })
      .catch(error => this.errorHandlerService.handle(error));
  } 

  salvar(){
    if(this.editando) {
      this.atualizarLancamento();
    } else {
      this.salvarLancamento();
    }
  }

  atualizarLancamento() {
    this.lancamentoService.atualizar(this.lancamentoForm.value)
                          .then(lancamento => {
                            this.messageService.add({ severity: 'success', detail: 'Lançamento atualizado com sucesso!' });
                            
                            this.lancamentoForm.patchValue(lancamento);
                            this.atualizarTitulo();
                            

                          })
                          .catch(error => this.errorHandlerService.handle(error));
  }

  salvarLancamento() {
    this.lancamentoService.adicionar(this.lancamentoForm.value)
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

  

  novo() {

    this.lancamentoForm.reset();
    this.lancamentoForm.patchValue(new Lancamento());
    
    this.router.navigate(['/lancamentos/cadastro'])

    // setTimeout(() => {
    //   this.lancamento = new Lancamento();
    // }, 1);
  }
  
  atualizarTitulo() {
    this.title.setTitle(this.editando ? 'Edição de lançamento' : 'Cadastro de lançamento'); 
    // `Edição de lançamento: ${this.formulario.get('descricao')?.value}`
  }

  // OnInit
  ngOnInit() {

    this.configuraReactiveForm();
    
    const codigoLancamento = this.route.snapshot.params['codigo'];

    this.title.setTitle('Cadastro de lançamento');

    if (codigoLancamento && codigoLancamento !== 'cadastro') {
      this.carregarLancamento(codigoLancamento);
    }

    this.buscarCategorias();
    this.buscarPessoas();
  }

    configuraReactiveForm() {
    this.lancamentoForm = this.formBuilder.group({
      codigo: [],
      tipo: ['RECEITA', Validators.required],
      dataVencimento: [null, Validators.required],
      dataPagamento: [],
      descricao: [null, [ this.validadorCampoRequerido, this.validadorTamanhoMinimo(5) ]],
      valor: [null, Validators.required],
      pessoa: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      categoria: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      observacao: []
    });
  }

  validadorCampoRequerido(input: FormControl) {
    return input.value ? null : { campoRequerido: true };
  }

  validadorTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor } };
    };
  }

}
