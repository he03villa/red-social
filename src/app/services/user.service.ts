import { Injectable, inject } from '@angular/core';
import { DataService } from './data.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _data: DataService = inject(DataService);

  constructor() { }

  login(data:any) {
    const url = `${ environment.ApiURL }${ environment.api.login }`;
    return this._data.metodoPost(url, data);
  }

  saveUser(data:any) {
    const url = `${ environment.ApiURL }${ environment.api.saveUser }`;
    return this._data.metodoPost(url, data);
  }

  updateUser(data:any, id:string) {
    const url = `${ environment.ApiURL }${ environment.api.actulizarUsuario }/${ id }`;
    return this._data.metodoPut(url, data);
  }
}
