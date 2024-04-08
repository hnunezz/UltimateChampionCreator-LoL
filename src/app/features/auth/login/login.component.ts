import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  confirmPassword: string = '';
  password: string = '';
  email: string = '';

  isLogin: boolean = false;

}
