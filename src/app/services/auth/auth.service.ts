import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../../utils';
import { Injectable } from '@angular/core';

// import jwtDecode from 'jwt-decode';
import decode from 'jwt-decode';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {
  }

  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  public loginRequest(user): Observable<any> {
    return this.http.post(`${API}auth/signin`, user);
  }

  public setUser(resp: any) {
    localStorage.setItem('access_token', resp.access_token);
    this.router.navigate(['']);
  }
}
