import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./partials/auth/auth.component";
import { RegistrationComponent } from "./partials/registration/registration.component";
import { ResetpwdComponent } from "./partials/resetpwd/resetpwd.component";
import { DashboardComponent } from "./partials/main/dashboard/dashboard.component";
import { AuthGuard, NonAuthGuard } from "./guards";
import { MainComponent } from "./partials/main/main.component";
import { UserComponent } from "./partials/main/user/user.component";
import { TimelineComponent } from "./partials/main/timeline/timeline.component";
import { NotfoundComponent } from "./partials/notfound/notfound.component";
import {GophComponent} from './partials/main/goph/goph.component';

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "user", component: UserComponent },
      { path: "user/:id", component: UserComponent },
      { path: "goph/:id", component: GophComponent },
      { path: "", component: TimelineComponent, pathMatch: "full" },
    ],
  },
  {
    path: "register",
    component: RegistrationComponent,
    canActivate: [NonAuthGuard],
  },
  { path: "auth", component: AuthComponent, canActivate: [NonAuthGuard] },
  {
    path: "resetpwd",
    component: ResetpwdComponent,
    canActivate: [NonAuthGuard],
  },
  { path: "404", component: NotfoundComponent },
  { path: "**", redirectTo: "/404" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
