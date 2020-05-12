import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './partials/auth/auth.component';
import { RegistrationComponent } from './partials/registration/registration.component';
import { ResetpwdComponent } from './partials/resetpwd/resetpwd.component';
import {DashboardComponent} from './partials/main/dashboard/dashboard.component';
import {AuthGuard, NonAuthGuard} from './guards';
import {MainComponent} from './partials/main/main.component';
import {UserComponent} from './partials/main/user/user.component';
import {TimelineComponent} from './partials/main/timeline/timeline.component';


const routes: Routes = [
  { path : '', component: MainComponent, canActivate: [AuthGuard], children: [
      { path: 'user', component: UserComponent },
      { path: 'user/:id', component: UserComponent },
      { path: '', component: TimelineComponent, pathMatch: 'full' }
    ]},
  { path: 'register', component: RegistrationComponent, canActivate: [NonAuthGuard] },
  { path: 'auth', component: AuthComponent, canActivate: [NonAuthGuard] },
  { path: 'resetpwd', component: ResetpwdComponent, canActivate: [NonAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
