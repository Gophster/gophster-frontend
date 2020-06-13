import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NonAuthGuard} from '../../../guards';
import {FormsModule} from '@angular/forms';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {GophComponent} from './goph.component';

@NgModule({
  imports: [CommonModule, FormsModule,
    InfiniteScrollModule],
  declarations: [GophComponent],
  exports: [GophComponent],
  providers: [NonAuthGuard]
})

export class GophModule {

}
