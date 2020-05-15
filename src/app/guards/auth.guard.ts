import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }

  public canActivate(): boolean {
    if (localStorage.getItem('access_token')) {
      const expirationDate = Number(jwtDecode(localStorage.getItem('access_token')).exp);
      if (Date.now() >= expirationDate * 1000) {
        localStorage.clear();
        this.router.navigate(['/auth']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/auth']);
    return false;
  }
}
