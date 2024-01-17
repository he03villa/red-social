import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceService } from '../../services/service.service';
import { UserService } from '../../services/user.service';
import { Mensaje } from '../../interfaces/mensaje';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  form: FormGroup = new FormGroup({});
  private fb: FormBuilder = new FormBuilder();
  _services: ServiceService = inject(ServiceService);
  _user: UserService = inject(UserService);

  ngOnInit() {
    this.form = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]],
      FullName: ['', [Validators.required]],
      Age: ['', [Validators.required]]
    });
  }

  save(event:any) {
    this._services.addLoading(event.target);
    const data = this.form.getRawValue();
    console.log(data);
    this._user.saveUser(data).subscribe(async (res: Mensaje) => {
      /* const dataUser = res.user; */
      console.log(res);
      const resDia =  await this._services.Alert('success', '', res.message, 'Aceptar');
      if (resDia.isDismissed || resDia.isConfirmed) {
        this._services.url('login');
      }
      this._services.removeLoading(event.target);
    });
  }
}
