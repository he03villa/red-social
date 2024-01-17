import { CanActivateFn } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { inject } from '@angular/core';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const dataUser = localStorage.getItem('dataUser') || '';
  const _services: ServiceService = inject(ServiceService);
  if (dataUser == '') {
    return true;
  }
  _services.url('post');
  return false;
};
