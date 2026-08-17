import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { Contato } from 'src/app/core/contato.model';

@Component({
  selector: 'app-pessoa-cadastro-contato',
  templateUrl: './pessoa-cadastro-contato.component.html',
  styleUrls: ['./pessoa-cadastro-contato.component.css']
})
export class PessoaCadastroContatoComponent implements OnInit {

  @Input() 
  contatos:Array<Contato> = [];
  
  contato?:Contato;

  exbindoFormularioContato = false;
  contatoIndex?: number;

  constructor(private messageService: MessageService) { 
  }

    // Contato
    dialogFormNovoContato() {
      this.exbindoFormularioContato = true;
      this.contato = new Contato();
      this.contatoIndex = this.contatos.length;
    }
  
    preEdicaoContato(contato: Contato, index: number)   {
      this.contato = this.clonarContato(contato);
      this.exbindoFormularioContato = true; 
      this.contatoIndex = index;
    }
  
    confirmarContato(form: NgForm) {
      // this.pessoa.contatos.push(this.clonarContato(this.contato!));
      this.contatos[this.contatoIndex!] = this.clonarContato(this.contato!);
      this.exbindoFormularioContato = false;
      form.reset();
    }
  
    removerContato(index: number) {
      this.contatos.splice(index, 1);
      this.messageService.add({ severity: 'success', 
                                detail: 'Contato removido com sucesso!' 
                              });
    }
  
    private clonarContato(contato: Contato): Contato {
      return new Contato(contato.codigo, contato.nome, contato.email, contato.telefone);
    }

    get editando() {
    return this.contato && this.contato?.codigo;
    }
  
    

  ngOnInit(): void {
  }

}
