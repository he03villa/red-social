import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private _route: Router = inject(Router);

  constructor() { }

  url(urls:string) {
    this._route.navigate([urls]);
  }

  Alert(icon:any, title:string, text:string, confirmButtonText:string, showCancelButton = false, cancelButtonText = '', showCloseButton = true, backdrop = true) {
    return Swal.fire({
      icon,
      title,  
      html: text,
      confirmButtonText,
      cancelButtonText,
      showCancelButton,
      showCloseButton: showCloseButton,
      backdrop: backdrop,
      background: '.swal2-container.swal2-backdrop-show'
    }).then();
  }

  addLoading(target: any) {
    if (target) {
      target.innerHTML += " <i class='fas fa-spinner fa-pulse'></i>"; 
      target.disabled = true;
    } else {
      console.error('El elemento HTML es nulo.');
    }
  }
  

  removeLoading(target: any) {
    if (target) {
      let spinner = target.lastChild;
      if (spinner) {
        target.removeChild(spinner);
      }
      target.disabled = false;
    } else {
      console.error('El elemento HTML es nulo.');
    }
  }
}
