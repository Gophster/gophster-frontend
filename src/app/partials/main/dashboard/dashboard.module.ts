import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {NonAuthGuard} from '../../../guards';

@NgModule({
  imports: [CommonModule],
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
  providers: [NonAuthGuard]
})

export class DashboardModule {

}
