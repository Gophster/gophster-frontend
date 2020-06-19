import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../../utils';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient, private socket: Socket) {

  }

  public getNotifications() {
    return this.socket.fromEvent('notification').pipe(map(notification => notification));
  }

  public getNotification(params?: any): Observable<any> {
    if (params) {
      return this.http.get(`${API}notification${params}`);
    } else {
      return this.http.get(`${API}notification?limit=10`);
    }
  }

  public countNotifications(): Observable<any> {
    return this.http.get(`${API}notification/count`);
  }

  public readAllNotifications(): Observable<any> {
    return this.http.post(`${API}notification/read-all`, null);
  }

}
