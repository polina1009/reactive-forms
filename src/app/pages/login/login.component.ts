import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PatientsInterface } from '../../interfaces/patient.interface';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public formSubmitAttempt: boolean;
  public newPatient: boolean;
  public errorString: string;
  private patient: PatientsInterface = {
    email: '',
    password: ''
  };

  constructor(
    private fB: FormBuilder,
    protected loginService: LoginService,
    private router: Router
  ) {
    this.errorString = '';
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
