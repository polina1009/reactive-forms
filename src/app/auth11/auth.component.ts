import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {LoginService} from './login.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup;
  public formSubmitAttempt: boolean;

  constructor(
    private fB: FormBuilder,
    private loginService: LoginService
  ) { }

  public createForm () {
    this.loginForm = this.fB.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.createForm();
  }

  isFieldInvalid(field: string) {
    return (
      (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
      (this.loginForm.get(field).untouched && this.formSubmitAttempt)
    );
  }


  submitForm() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value);
    }
    this.formSubmitAttempt = true;
  }

}
