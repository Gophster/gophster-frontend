import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NonAuthGuard} from '../../../guards';
import {UserComponent} from './user.component';
import {FormsModule} from '@angular/forms';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

@NgModule({
  imports: [CommonModule, FormsModule,
    InfiniteScrollModule],
  declarations: [UserComponent],
  exports: [UserComponent],
  providers: [NonAuthGuard]
})

export class UserModule {

}
