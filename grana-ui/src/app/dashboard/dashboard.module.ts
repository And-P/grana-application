import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import {ChartModule} from 'primeng/chart';
import {PanelModule} from 'primeng/panel';

import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    ChartModule,
    PanelModule,
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ], 
  providers: [
    DecimalPipe
  ]
})
export class DashboardModule { }
