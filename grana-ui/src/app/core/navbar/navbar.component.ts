import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/seguranca/authentication.service';

import { ErrorHandlerService } from '../error-handler.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public exibindoMenu: boolean = false;
  public usuarioLogado: string = '';

  constructor( public authenticationService: AuthenticationService,
               private errorHandler: ErrorHandlerService,
               private router: Router
   ){}



  temPermissao(permissao: string) {
    return this.authenticationService.temPermissao(permissao);
  }  

  logout() {
    this.authenticationService.logout();
  }
}
