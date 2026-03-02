import { Pessoa } from './../core/model';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PessoaCadastroComponent } from "./pessoa-cadastro/pessoa-cadastro.component";
import { PessoasPesquisaComponent } from "./pessoas-pesquisa/pessoas-pesquisa.component";

const routes: Routes = [
  { path: 'pessoas', component: PessoasPesquisaComponent },
  { path: 'pessoas/:codigo', component: PessoaCadastroComponent },
  { path: 'pessoas/cadastro', component: PessoaCadastroComponent },
];

@NgModule({
    imports: [  
      RouterModule.forChild(routes),
    ],
     exports: [
        RouterModule,
     ],
})
export class PessoasRoutingModule { }