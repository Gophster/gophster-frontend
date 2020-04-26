import {MainComponent} from './main.component';
import {AuthGuard} from '../../guards';
import {DashboardComponent} from './dashboard/dashboard.component';

export const routes: any[] = [
  {
    path : '', component: MainComponent, canActivate: [AuthGuard], children: [
      {path : '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
     
    ]
  }
];
