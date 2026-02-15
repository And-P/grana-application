import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'grana-ui';

  constructor(private primengConfig: PrimeNGConfig, 
    private translateService: TranslateService
  ) {}

    ngOnInit() {
        this.primengConfig.ripple = true;

        this.translateService.setDefaultLang('pt');
        this.translateService.get('primeng')
          .subscribe(res => this.primengConfig.setTranslation(res));
    }
}
