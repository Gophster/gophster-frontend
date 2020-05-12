import {MainComponent} from './main.component';
import {AuthGuard} from '../../guards';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UserComponent} from './user/user.component';
import {TimelineComponent} from './timeline/timeline.component';

export const routes: any[] = [
  {
    path : '', component: MainComponent, canActivate: [AuthGuard], children: [
      { path: 'user', component: UserComponent },
      { path: 'user/:id', component: UserComponent },
      { path: '', component: TimelineComponent }
    ]
  }
];
