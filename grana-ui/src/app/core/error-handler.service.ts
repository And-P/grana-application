import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MessageService } from 'primeng/api';

import { NotAuthenticatedError } from './../seguranca/securityhttpinterceptor';
import { AuthenticationService } from '../seguranca/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService,
              private authenticationService: AuthenticationService,
              private router: Router
  ) { }

  handle(errorResponse: any) {
    let msg: string;
    
    console.log('ErrorHandlerService Handle Log: ');
    console.log('ErrorHandler errorResponse: ', errorResponse);


    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if (errorResponse instanceof NotAuthenticatedError) {
        console.log('NotAuthenticatedError Response: ', errorResponse);

        msg = 'Sua sessão expirou!';
        this.authenticationService.login();

    } else if (errorResponse instanceof HttpErrorResponse
                && errorResponse.status >= 400 && errorResponse.status <= 499) {
        msg = 'Ocorreu um erro ao processar a sua solicitação';

        if (errorResponse.status === 403) {
          msg = 'Permissão negada para esta ação.';
        }

        try {
          msg = errorResponse.error[0].mensagemUsuario;
        } catch (e) { }

        console.error('Ocorreu um erro', errorResponse);

    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      
      console.error('Ocorreu um erro', errorResponse);
    }

    this.messageService.add({ severity: 'error', detail: msg });
  }
}