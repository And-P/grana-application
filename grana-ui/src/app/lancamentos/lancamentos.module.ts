import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLinkWithHref, RouterModule } from "@angular/router";

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';


import { SharedModule } from '../shared/shared.module';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentoPesquisaComponent } from './lancamento-pesquisa/lancamento-pesquisa.component';
import { LancamentoService } from './lancamento.service';



@NgModule({
    declarations: [
        LancamentoCadastroComponent,
        LancamentoPesquisaComponent,
        
    ],
    imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,    
    RouterLinkWithHref,

    InputNumberModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,

    SharedModule,
],
    exports: [
        LancamentoCadastroComponent,
        LancamentoPesquisaComponent,
    ],
    providers: [
        LancamentoService
    ]
})
export class LancamentosModule {}