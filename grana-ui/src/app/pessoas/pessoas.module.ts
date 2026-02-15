import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';

import { SharedModule } from '../shared/shared.module';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoaService } from './pessoas-pesquisa/pessoa.service';

@NgModule({
   declarations: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent,
   ],
   imports: [
     CommonModule,
     FormsModule,

     InputTextModule,
     InputMaskModule,
     ButtonModule,
     TableModule,
     TooltipModule,
     DropdownModule,

     SharedModule,
   ],
   exports: [
     PessoaCadastroComponent,
     PessoasPesquisaComponent
   ],
    providers: [
     PessoaService   
    ],
})
export class PessoasModule { }