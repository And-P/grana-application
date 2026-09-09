import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: []
})
export class AuthorizedComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private route: Router
  ) { }


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params:any) => {
      
      if (params.code) {
        this.authenticationService.novoAccessTokenComCode(params.code, params.state)
          .then(()=> {
            this.route.navigate(['/']);
          })
          .catch((e:any) => {
            console.error('Erro no callback');
          });
      } else {
        this.route.navigate(['/']);
      }
    })
  }
}