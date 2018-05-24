import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {PatientsInterface} from '../../interfaces/patient.interface';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup;
  public formSubmitAttempt: boolean;
  newPatient: boolean;
  patient: PatientsInterface = {
    email: '',
    password: ''
  };

  constructor(
    private fB: FormBuilder,
    private loginService: LoginService
  ) {
  }

  public createForm () {
    this.loginForm = this.fB.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
      ])]
    });
  }

  ngOnInit() {
    this.createForm();
  }

  toggleForm() {
    this.newPatient = !this.newPatient;
  }

  isFieldInvalid(field: string) {
    return (
      (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
      (this.loginForm.get(field).untouched && this.formSubmitAttempt)
    );
  }


  submitLoginForm() {
    if (this.loginForm.valid) {
      this.patient.email = this.loginForm.get('email').value;
      this.patient.password = this.loginForm.get('password').value;
      this.loginService.login(this.patient);
    }
    // console.log(this.loginForm.value);
    this.formSubmitAttempt = true;
  }

  submitSignUpForm() {
    // console.log(this.loginForm.get('email').value, this.loginForm.get('password').value);
    if (this.loginForm.valid) {
      this.patient.email = this.loginForm.get('email').value;
      this.patient.password = this.loginForm.get('password').value;
      // console.log(this.patient);
      this.loginService.signUp(this.patient);
    }
    // console.log(this.loginForm.get('email').value, this.loginForm.get('password').value);
    this.formSubmitAttempt = true;
  }

}
