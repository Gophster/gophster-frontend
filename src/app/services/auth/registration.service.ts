import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../../utils';
import { Injectable } from '@angular/core';

@Injectable()
export class RegistrationService {
  constructor(private http: HttpClient) {
  }
  public registerRequest(user): Observable<any> {
    return this.http.post(`${API}auth/signup`, user);
  }
}
