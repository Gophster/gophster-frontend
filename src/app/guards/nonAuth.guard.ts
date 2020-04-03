import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class NonAuthGuard implements CanActivate {
  constructor(private router: Router) {
  }

  public canActivate(): boolean {
    if (window.localStorage.length === 0) {
      console.log(1);
      return true;
    }
    console.log(2);
    this.router.navigate(['/dashboard']);
    return false;
    }
}
