import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { RegistrationComponent } from './registration.component';
import { routes } from './registration.routes';
import {NonAuthGuard} from '../../guards';

@NgModule({
  imports: [CommonModule,
    FormsModule,
    RouterModule.forChild(routes)],
  declarations: [RegistrationComponent],
  exports: [RegistrationComponent],
  providers: [NonAuthGuard]
})

export class RegistrationModule {

}
