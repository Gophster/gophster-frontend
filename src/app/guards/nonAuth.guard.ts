import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class NonAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  public canActivate(): boolean {
    if (window.localStorage.length === 0) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
