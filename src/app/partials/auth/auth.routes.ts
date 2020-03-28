import { AuthComponent } from './auth.component';
import { NonAuthGuard } from '../../guards';

export const routes: any = [
  {
    path: '', children: [
      {path: '', component: AuthComponent, canActivate: [NonAuthGuard]},
    ]
  }
];
