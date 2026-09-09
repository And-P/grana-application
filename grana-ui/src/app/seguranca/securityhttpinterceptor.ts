import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";

import { Observable, from } from "rxjs";
import { mergeMap } from "rxjs/operators";

import { AuthenticationService } from "./authentication.service";


@Injectable()
export class SecurityHttpInterceptor implements HttpInterceptor {
    
    constructor( private authorizationService: AuthenticationService ) { }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
      if (!req.url.includes('/oauth2/token') && this.authorizationService.isAccessTokenInvalido()) {
          return from(this.authorizationService.novoAccessToken())
                 .pipe(
                      mergeMap(() => {
                         if (this.authorizationService.isAccessTokenInvalido()) {
                             throw new NotAuthenticatedError();
                         }

                         req = req.clone({
                             setHeaders: {
                               Authorization: `Bearer ${localStorage.getItem('token')}`
                             }
                         });
                     
                       return next.handle(req);
                     })
                 );
      }

      return next.handle(req);
    }

}

export class NotAuthenticatedError { 
  constructor() { }
}