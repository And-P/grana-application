import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/seguranca/authentication.service';
import { ErrorHandlerService } from '../error-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public exibindoMenu: boolean = false;
  public usuarioLogado: string = '';

  constructor( public auth: AuthenticationService,
               private errorHandler: ErrorHandlerService,
            private router: Router
   ) { }

  temPermissao(permissao: string) {
    return this.auth.temPermissao(permissao);
  }  

  logout() {
    this.auth.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  ngOnInit() {
    this.usuarioLogado = this.auth.jwtPayload?.user_name.split("@")[0];
    console.log(this.usuarioLogado);
  }

}
