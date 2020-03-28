import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class NonAuthGuard implements CanActivate{
  constructor(private router: Router) {
  }

  public canActivate(): boolean {
    return true;
  }
}
