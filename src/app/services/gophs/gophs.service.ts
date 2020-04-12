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

  public getGoph(): Observable<any> {
    return this.http.get(`${API}gophs`);
  }

  public deleteGoph(id: number): Observable<any> {
    return this.http.delete(`${API}gophs/${id}`);
  }
}
