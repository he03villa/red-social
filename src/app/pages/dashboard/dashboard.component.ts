import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  _service: ServiceService = inject(ServiceService);

  cerrar() {
    localStorage.removeItem('dataUser');
    this._service.url('login');
  }

}
