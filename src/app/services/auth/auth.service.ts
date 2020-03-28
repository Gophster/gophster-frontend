import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../../utils';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }
  public loginRequest(user): Observable<any> {
    return this.http.post(`${API}auth/signin`, user);
  }
}
