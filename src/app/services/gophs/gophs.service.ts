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

  public getGophs(params?: any): Observable<any> {
    if (params) {
      return this.http.get(`${API}gophs/feed${params}`);
    } else {
      return this.http.get(`${API}gophs/feed?limit=10`);
    }
  }

  public getGoph(id: number): Observable<any> {
    return this.http.get(`${API}gophs/${id}`);
  }

  public getRepliesQuantity(id: string): Observable<any> {
    return this.http.get(`${API}reply/${id}`);
  }

  public getFollowersData(userHandle: string): Observable<any> {
    return this.http.get(`${API}actions/followers/${userHandle}`);
  }

  public getFollowingsData(userHandle: string): Observable<any> {
    return this.http.get(`${API}actions/following/${userHandle}`);
  }

  public getReplies(id: string, params: any): Observable<any> {
    if (params) {
      return this.http.get(`${API}reply/${id}${params}`);
    } else {
      return this.http.get(`${API}reply/${id}?limit=10`);
    }

  }
  public postReply(reply: string, gophId: string): Observable<any> {
    return this.http.post(`${API}reply`, {text : reply, goph: gophId});
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
