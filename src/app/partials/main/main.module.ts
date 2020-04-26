import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { routes } from "./main.routes";
import { AuthGuard, NonAuthGuard } from "../../guards";
import { MainComponent } from "./main.component";
import { DashboardModule } from "./dashboard/dashboard.module";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { TimelineComponent } from "./timeline/timeline.component";
import { BottomNavBarComponent } from './bottom-nav-bar/bottom-nav-bar.component';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardModule,
    RouterModule.forChild(routes),
  ],
  declarations: [MainComponent, SidebarComponent, TimelineComponent, BottomNavBarComponent, UserComponent],
  exports: [MainComponent],
  providers: [AuthGuard],
})
export class MainModule {}
