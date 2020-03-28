import { RegistrationComponent } from './registration.component';
import { NonAuthGuard } from '../../guards';

export const routes: any = [
  {
    path: '', children: [
      {path: '', component: RegistrationComponent, canActivate: [NonAuthGuard]},
    ]
  }
];
