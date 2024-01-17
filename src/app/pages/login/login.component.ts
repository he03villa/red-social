import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceService } from '../../services/service.service';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  form: FormGroup = new FormGroup({});
  private fb: FormBuilder = new FormBuilder();
  _services: ServiceService = inject(ServiceService);
  _user: UserService = inject(UserService);

  ngOnInit() {
    this.form = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]]
    });
  }

  login(event:any) {
    this._services.addLoading(event.target);
    const data = this.form.getRawValue();
    this._user.login(data).subscribe((res: User) => {
      const dataUser = res.user;
      localStorage.setItem('dataUser', JSON.stringify(dataUser));
      this._services.removeLoading(event.target);
      this._services.url('post');
    });
  }

}
