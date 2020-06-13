import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './main.routes';
import { AuthGuard, NonAuthGuard } from '../../guards';
import { MainComponent } from './main.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TimelineComponent } from './timeline/timeline.component';
import { BottomNavBarComponent } from './bottom-nav-bar/bottom-nav-bar.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UserComponent } from './user/user.component';
import { UserModule } from './user/user.module';
import { GophModule } from './goph/goph.module';
import {GophComponent} from './goph/goph.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardModule,
    UserModule,
    GophModule,
    RouterModule.forChild(routes),
    InfiniteScrollModule
  ],
  declarations: [MainComponent, SidebarComponent, TimelineComponent, BottomNavBarComponent],
  exports: [MainComponent],
  providers: [AuthGuard],
})
export class MainModule {}
