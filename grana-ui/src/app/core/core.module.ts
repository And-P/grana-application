import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLinkWithHref, RouterModule } from "@angular/router";
import { Title } from '@angular/platform-browser';

import localePt from '@angular/common/locales/pt';

import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { AuthenticationService } from '../seguranca/authentication.service';

registerLocaleData(localePt, 'pt-BR');

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

    ToastModule,
    ConfirmDialogModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    RouterLinkWithHref
],
  exports: [
    NavbarComponent,

    ToastModule,
    ConfirmDialogModule,

  ],
  providers: [
    DatePipe,
    ErrorHandlerService,

    MessageService,
    ConfirmationService,
    TranslateService,
    Title,
    AuthenticationService,
  ]
})
export class CoreModule { }