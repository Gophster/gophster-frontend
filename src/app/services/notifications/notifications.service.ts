import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../../utils';
import { Injectable } from '@angular/core';

// import jwtDecode from 'jwt-decode';
import decode from 'jwt-decode';
import {Router} from '@angular/router';

@Injectable()
export class NotificationsService {

  constructor(private http: HttpClient) {
  }

  public getNotification(): Observable<any> {
    return this.http.get(`${API}notification`);
  }

  public countNotifications(): Observable<any> {
    return this.http.get(`${API}notification/count`);
  }

  public readAllNotifications(): Observable<any> {
    return this.http.post(`${API}notification/read-all`, null);
  }

}
