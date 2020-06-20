import {CommonModule} from '@angular/common';
import {Injectable, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthGuard, NonAuthGuard} from '../../guards';
import {MainComponent} from './main.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {TimelineComponent} from './timeline/timeline.component';
import {BottomNavBarComponent} from './bottom-nav-bar/bottom-nav-bar.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {UserModule} from './user/user.module';
import {GophModule} from './goph/goph.module';
import {MessageComponent} from './message/message.component';
import {NotificationComponent} from './notification/notification.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { routes } from '../../app-routing.module';
import { RouterModule } from '@angular/router';
import { SocketIoModule, SocketIoConfig, Socket } from 'ngx-socket-io';
import { API } from './../../utils';

const config: SocketIoConfig = { url: API , options: {  }};


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserModule,
    GophModule,
    RouterModule.forChild(routes),
    InfiniteScrollModule,
    SocketIoModule.forRoot(config)
  ],
  declarations: [
    MainComponent,
    SidebarComponent,
    TimelineComponent,
    BottomNavBarComponent,
    NotificationComponent,
    MessageComponent,
    DashboardComponent
  ],
  exports: [MainComponent],
  providers: [AuthGuard],
})
export class MainModule {
}
