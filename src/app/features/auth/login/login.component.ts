import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public confirmPassword: string = '';
  public password: string = '';
  public email: string = '';

  public isLogin: boolean = false;

}
