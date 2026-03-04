import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'grana-ui';

  constructor( private primengConfig: PrimeNGConfig, 
               private translateService: TranslateService,
               private router: Router
  ) {}

  exibirNavbar() {
    return this.router.url !== '/login';
  }

  ngOnInit() {
      this.primengConfig.ripple = true;

      this.translateService.setDefaultLang('pt');
      this.translateService.get('primeng')
                           .subscribe(res => this.primengConfig.setTranslation(res));
  }

}
