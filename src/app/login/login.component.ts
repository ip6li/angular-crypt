import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AppComponent} from '../app.component';

export interface Credentials {
  username: string;
  password: string;
  csr: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials: Credentials;
  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  constructor(private formBuilder: FormBuilder, private appComponent: AppComponent) {
    this.credentials = {
      username: '',
      password: '',
      csr: ''
    };
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.credentials.username = this.loginForm.value.username;
    this.credentials.password = this.loginForm.value.password;
    if (this.appComponent.pkcs10 != null) {
      this.credentials.csr = this.appComponent.pkcs10;
    }
    console.log('Your login data has been submitted: %o', this.credentials);
    this.appComponent.x509.login(this.credentials).then((v: any) => {
      console.log('login: %o', v);
    });
    this.loginForm.reset();
  }
}
