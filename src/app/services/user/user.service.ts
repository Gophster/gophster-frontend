import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../../utils';
import { Injectable } from '@angular/core';

// import jwtDecode from 'jwt-decode';
import decode from 'jwt-decode';
import {Router} from '@angular/router';

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private router: Router) {
  }

  public getUserData(handle): Observable<any> {
    return this.http.get(`${API}user/${handle}`);
  }

  public postUserData(data): Observable<any> {
    const formData = new FormData();
    if (data.name) {
      formData.append('name', data.name);
    }
    if (data.location) {
      formData.append('location', data.location);
    }
    if (data.birthdate) {
      formData.append('birthdate', data.birthdate);
    }
    if (data.avatar && data.fileName) {
      formData.append('avatar', data.avatar, data.fileName);
    }

    const headers: HttpHeaders = new HttpHeaders({enctype: 'multipart/form-data'});
    return this.http.post(`${API}user/profile`, formData, {headers});
  }
}
