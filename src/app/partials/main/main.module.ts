import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { routes } from './main.routes';
import {AuthGuard, NonAuthGuard} from '../../guards';
import {MainComponent} from './main.component';
import {DashboardModule} from './dashboard/dashboard.module';

@NgModule({
  imports: [CommonModule,
    DashboardModule,
    RouterModule.forChild(routes)],
  declarations: [MainComponent],
  exports: [MainComponent],
  providers: [AuthGuard]
})

export class MainModule {
}
