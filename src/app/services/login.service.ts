import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from './api.service';
import { PatientService } from './patient.service';

import { PatientsInterface } from '../interfaces/patient.interface';

import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class LoginService {
  patient: Observable<PatientsInterface | null>;
  public signUpError: boolean;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute,
    private patientService: PatientService,
    private apiService: ApiService
  ) {
    this.signUpError = false;
  }

  private emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.apiService.getLoggedUserWithCurrentData(email);
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  private emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.apiService.updateJustSignUpUserWithDefaults(email);
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  public login(user: PatientsInterface) {
    this.patientService.getPatient().subscribe(patientData => {
      patientData.map(pat => {
        if (user.email === pat.email && user.password === pat.password) {
          return this.emailLogin(user.email, user.password).then();
        } else {
          this.signUpError = true;
          return false;
        }
      });
    });
  }

  public signUp(user: PatientsInterface) {
    if (user.email !== '' && user.password !== '') {
      return this.emailSignUp(user.email, user.password)
        .then((success) => {
          if (success === true) {
            return this.patientService.addPatient(user);
          } else {
            return false;
          }
        });
    }
  }

  public logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login'], { relativeTo: this.route }).then();
    });
  }

}
