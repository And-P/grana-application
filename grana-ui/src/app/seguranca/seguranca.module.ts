import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';


import { AuthGuard } from './auth.guard';
import { SecurityHttpInterceptor } from './securityhttpinterceptor';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { environment } from 'src/environments/environment';
import { AuthorizedComponent } from './authorized/authorized.component';


export function tokenGetter(): string {
  return localStorage.getItem('token')!;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.tokenAllowedDomains,
        disallowedRoutes: environment.tokenDisallowedRoutes
      }
    }),

    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule, 
  ],
  providers: [
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityHttpInterceptor,
      multi: true
    },
    AuthGuard
  ],
  declarations: [
    AuthorizedComponent
  ]
})
export class SegurancaModule { }