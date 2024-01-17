import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _http: HttpClient = inject(HttpClient);

  constructor() { }

  metodoGet(url:string): Observable<any> {
    let headers = { headers: new HttpHeaders() };
    const dataUser = localStorage.getItem('dataUser') || '';
    if (dataUser != '') {
      const user = JSON.parse(dataUser);
      headers.headers = headers.headers.append('Authorization', user.token);
    }
    return this._http.get(url, headers);
  }

  metodoPost(url:string, body:any): Observable<any> {
    const headers = { headers: new HttpHeaders() };
    const dataUser = localStorage.getItem('dataUser') || '';
    if (dataUser != '') {
      const user = JSON.parse(dataUser);
      headers.headers = headers.headers.append('Authorization', user.token);
    }
    return this._http.post(url, body, headers);
  }

  metodoPut(url:string, body:any): Observable<any> {
    const headers = { headers: new HttpHeaders() };
    const dataUser = localStorage.getItem('dataUser') || '';
    if (dataUser != '') {
      const user = JSON.parse(dataUser);
      headers.headers = headers.headers.append('Authorization', user.token);
    }
    return this._http.put(url, body, headers);
  }

  metodoDelete(url:string): Observable<any> {
    const headers = { headers: new HttpHeaders() };
    const dataUser = localStorage.getItem('dataUser') || '';
    if (dataUser != '') {
      const user = JSON.parse(dataUser);
      headers.headers = headers.headers.append('Authorization', user.token);
    }
    return this._http.delete(url, headers);
  }
}
