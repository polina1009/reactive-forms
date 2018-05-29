import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoginService } from '../../services/login.service';
import { PatientsInterface } from '../../interfaces/patient.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public loginForm: FormGroup;
  public formSubmitAttempt: boolean;
  public newPatient: boolean;
  public logError: string;
  private patient: PatientsInterface = {
    email: '',
    password: ''
  };

  constructor(
    private fB: FormBuilder,
    protected loginService: LoginService,
    private router: Router
  ) {
    this.logError = '';
  }

  ngOnInit() {
    this.createForm();
  }

  public createForm () {
    this.loginForm = this.fB.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required])]
    });
  }


  public toggleForm() {
    this.newPatient = !this.newPatient;
    this.router.navigate(['/sign-up']).then();
  }

  public isFieldInvalid(field: string) {
    return (
      (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
      (this.loginForm.get(field).untouched && this.formSubmitAttempt)
    );
  }


  public submitLoginForm() {
    if (this.loginForm.valid) {
      this.patient.email = this.loginForm.get('email').value;
      this.patient.password = this.loginForm.get('password').value;
      this.loginService.login(this.patient);
      this.newPatient = false;
    }
  }
}
