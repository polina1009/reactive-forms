import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PatientsInterface} from '../../interfaces/patient.interface';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup;
  public formSubmitAttempt: boolean;
  public newPatient: boolean;
  public logError: string;
  private patient: PatientsInterface = {
    email: '',
    password: ''
  };

  constructor(
    private fB: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.logError = '';
  }

  ngOnInit() {
    this.createForm();
  }

  public createForm () {
    this.signUpForm = this.fB.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
      ])]
    });
  }

  public toggleForm() {
    this.newPatient = !this.newPatient;
    this.router.navigate(['/login']).then();
  }

  public isFieldInvalid(field: string) {
    return (
      (!this.signUpForm.get(field).valid && this.signUpForm.get(field).touched) ||
      (this.signUpForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  public submitSignUpForm() {
    if (this.signUpForm.valid) {
      this.patient.email = this.signUpForm.get('email').value;
      this.patient.password = this.signUpForm.get('password').value;
      this.newPatient = true;
      this.loginService.signUp(this.patient)
        .then(success => {
          if (success === false) {
            this.logError = 'The email address is already in use by another account.';
          }
        });
    }
  }

}
