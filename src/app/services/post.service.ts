import { Injectable, inject } from '@angular/core';
import { DataService } from './data.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private _data: DataService = inject(DataService);

  constructor() { }

  getAllPost(page:number, limit: number, filtrar = '') {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (filtrar != '') {
      params.append('filtrar', filtrar);
    }
    const url = `${ environment.ApiURL }${ environment.api.getAllPost }?${ params.toString() }`;
    return this._data.metodoGet(url);
  }

  savePost(data:any) {
    const url = `${ environment.ApiURL }${ environment.api.savePost }`;
    return this._data.metodoPost(url, data);
  }

  updatePost(data:any, id:string) {
    const url = `${ environment.ApiURL }${ environment.api.updatePost }/${ id }`;
    return this._data.metodoPut(url, data);
  }

  deletePost(id:string) {
    const url = `${ environment.ApiURL }${ environment.api.deletePost }/${ id }`;
    return this._data.metodoDelete(url);
  }

  likePost(id:string) {
    const url = `${ environment.ApiURL }${ environment.api.likePost }/${ id }`;
    return this._data.metodoPut(url, {});
  }
}
