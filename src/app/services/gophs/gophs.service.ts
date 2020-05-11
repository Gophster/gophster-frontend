import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../../utils';
import { Injectable } from '@angular/core';

// import jwtDecode from 'jwt-decode';
import decode from 'jwt-decode';
import {Router} from '@angular/router';

@Injectable()
export class GophsService {

  constructor(private http: HttpClient, private router: Router) {
  }

  public postGoph(obj: any): Observable<any> {
    return this.http.post(`${API}gophs`, obj);
  }

  public getGoph(params?: any): Observable<any> {
    if (params) {
      return this.http.get(`${API}gophs${params}`);
    } else {
      return this.http.get(`${API}gophs?limit=10`);
    }
  }

  public getProfileGoph(handle: any, params?: any): Observable<any> {
    if (params) {
      return this.http.get(`${API}gophs/user/${handle}${params}`);
    } else {
      return this.http.get(`${API}gophs/user/${handle}?limit=10`);
    }
  }

  public deleteGoph(id: number): Observable<any> {
    return this.http.delete(`${API}gophs/${id}`);
  }

  public editGoph(id: number, text: any): Observable<any> {
    return this.http.patch(`${API}gophs/${id}`, text);
  }
}
