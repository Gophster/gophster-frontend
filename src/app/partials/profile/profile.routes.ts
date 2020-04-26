import {ProfileComponent} from './profile.component';
import {AuthGuard} from '../../guards';


export const routes: any[] = [
  {
    path : '', component: ProfileComponent, canActivate: [AuthGuard], children: [
      {path : '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'profile', component: ProfileComponent},
     
    ]
  }
];
