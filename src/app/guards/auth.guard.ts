import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }

  public canActivate(): boolean {
    if (localStorage.getItem('access_token')) {
      console.log(3);
      return true;
    }
    console.log(4);
    this.router.navigate(['/auth']);
    return false;
  }
}
