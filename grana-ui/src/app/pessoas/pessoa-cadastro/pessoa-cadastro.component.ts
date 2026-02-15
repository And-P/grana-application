import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { PessoaCadastro } from 'src/app/core/model';
import { PessoaService } from '../pessoas-pesquisa/pessoa.service';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent {

  bairros = [
    { label: 'Aclimação', value: 1 },
    { label: 'Bela Vista', value: 2 },
    { label: 'Consolação', value: 3 },
    { label: 'Mirandópolis', value: 4 },
    { label: 'Saúde', value: 5 },
    { label: 'Paraíso', value: 6 },
    { label: 'Vila Madalena', value: 7 },
    { label: 'Vila Mariana', value: 8 },
    { label: 'Moema', value: 9 }
  ];

  cidades = [
    { label: 'Cuiabá', value: 1 },
    { label: 'Belo Horizonte', value: 2 },
    { label: 'Florianópolis', value: 3 },
    { label: 'João Pessoa', value: 4 },
    { label: 'Manaus', value: 5 },
    { label: 'Porto Alegre', value: 6 },
    { label: 'Recife', value: 7 },
    { label: 'São Francisco do Sul', value: 8 },
    { label: 'São Paulo', value: 9 },
    { label: 'Vitória', value: 10 }
  ];

  estados = [
    { label: 'Alagoas', value: 1 },
    { label: 'Amazonas', value: 2 },
    { label: 'Espirito Santo', value: 3 },
    { label: 'Mato Grosso', value: 4 },
    { label: 'Minas Gerais', value: 5 },
    { label: 'Pernambuco', value: 6 },
    { label: 'Rio Grande do Sul', value: 7 },
    { label: 'São Paulo', value: 8 },
    { label: 'Santa Catarina', value: 9 }
  ];  
  
  paises = [
    { label: 'Argentina', value: 1 },
    { label: 'Brasil', value: 2 },
    { label: 'China', value: 3 },
    { label: 'Espanha', value: 4 },
    { label: 'Inglaterra', value: 5 },
    { label: 'Itália', value: 6 },
    { label: 'Portugal', value: 7 },
    { label: 'Venezuela', value: 8 }
  ];  

  pessoa = new PessoaCadastro();

  constructor( private pessoaService: PessoaService,
               private messageService: MessageService,
               private errorHandler: ErrorHandlerService ) { }

  cadastrar(form: NgForm) {
    this.pessoaService.salvar(this.pessoa)
        .then( () => {
          this.messageService.add({ severity: 'success', detail: 'Pessoa cadastrada com sucesso!' });

          form.reset();
          this.pessoa = new PessoaCadastro();
        })
        .catch( error => this.errorHandler.handle(error));  
  }


}
