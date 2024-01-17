import { CanActivateFn } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const dataUser = localStorage.getItem('dataUser') || '';
  const _services: ServiceService = inject(ServiceService);
  if (dataUser != '') {
    return true;
  }
  _services.url('login');
  return false;
};
