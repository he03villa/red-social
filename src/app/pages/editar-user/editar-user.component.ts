import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceService } from '../../services/service.service';
import { UserService } from '../../services/user.service';
import { UserClass } from '../../interfaces/user';
import { Mensaje } from '../../interfaces/mensaje';

@Component({
  selector: 'app-editar-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-user.component.html',
  styleUrl: './editar-user.component.scss'
})
export class EditarUserComponent {
  form: FormGroup = new FormGroup({});
  private fb: FormBuilder = new FormBuilder();
  _services: ServiceService = inject(ServiceService);
  _user: UserService = inject(UserService);
  dataUsuario: UserClass | undefined;

  ngOnInit() {
    const dataUser = localStorage.getItem('dataUser') || '';
    if (dataUser != '') {
      this.dataUsuario = JSON.parse(dataUser);
    }
    this.form = this.fb.group({
      FullName: [this.dataUsuario?.FullName, [Validators.required]],
      Age: [this.dataUsuario?.Age, [Validators.required]]
    });
  }

  save(event: any) {
    this._services.addLoading(event.target);
    const data = this.form.getRawValue();
    const id = this.dataUsuario ? this.dataUsuario._id : '';
    this._user.updateUser(data, id).subscribe((res: Mensaje) => {
      this._services.removeLoading(event.target);
      if (this.dataUsuario) {
        this.dataUsuario.Age = data.Age;
        this.dataUsuario.FullName = data.FullName;
        localStorage.setItem('dataUser', JSON.stringify(this.dataUsuario));
      }
      this._services.Alert('success', '', res.message, 'Aceptar');
    });
  }
}
