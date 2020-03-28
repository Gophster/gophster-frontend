import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AuthComponent} from './auth.component';
import { routes } from './auth.routes';
import {NonAuthGuard} from '../../guards';

@NgModule({
  imports: [CommonModule,
    FormsModule,
    RouterModule.forChild(routes)],
  declarations: [AuthComponent],
  exports: [AuthComponent],
  providers: [NonAuthGuard]
})

export class AuthModule {
}
