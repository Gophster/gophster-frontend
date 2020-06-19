import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../../utils';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient, private socket: Socket) {
  }

  public getMessagesLive() {
    return this.socket.fromEvent('new-message').pipe(map(messages => messages));
  }

  public getMessages(uuid: string): Observable<any> {
    return this.http.get(`${API}messenger/conversation/users/${uuid}`);
  }

  public getUsers(): Observable<any> {
    return this.http.get(`${API}messenger/conversation/users`);
  }

}
