import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LancamentoPesquisaComponent } from "./lancamento-pesquisa/lancamento-pesquisa.component";
import { LancamentoCadastroComponent } from "./lancamento-cadastro/lancamento-cadastro.component";

const routes: Routes = [
  { path: 'lancamentos', component: LancamentoPesquisaComponent },
  { path: 'lancamentos/:codigo', component: LancamentoCadastroComponent },
  { path: 'lancamentos/cadastro', component: LancamentoCadastroComponent },
];

@NgModule({
    imports: [  
      RouterModule.forChild(routes),
    ],
     exports: [
        RouterModule,
     ],
})
export class LancamentosRoutingModule { }