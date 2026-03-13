import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";

import { Observable, from } from "rxjs";
import { mergeMap } from "rxjs/operators";

import { AuthenticationService } from "./authentication.service";


export class NotAuthenticatedError { }


@Injectable()
export class SecurityHttpInterceptor implements HttpInterceptor {

    
    constructor( private auth: AuthenticationService ) {}


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
      if (!req.url.includes('/oauth/token') && this.auth.isAccessTokenInvalido()) {
          return from(this.auth.novoAccessToken())
          .pipe(
              mergeMap(() => {
                if (this.auth.isAccessTokenInvalido()) {
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

