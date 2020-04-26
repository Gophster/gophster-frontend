import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }

  public canActivate(): boolean {
    if (localStorage.getItem('access_token')) {
      return true;
    }
    this.router.navigate(['/auth']);
    return false;
  }
}
