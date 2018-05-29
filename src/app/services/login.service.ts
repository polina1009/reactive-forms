import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientService} from './patient.service';
import {PatientsInterface} from '../interfaces/patient.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {ApiService} from './api.service';

@Injectable()
export class LoginService {
  patient: Observable<PatientsInterface | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute,
    private patientService: PatientService,
    private apiService: ApiService
  ) {
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.apiService.getLoggedUserWithCurrentData(email);
        return;
      });
  }

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.apiService.updateJustSignUpUserWithDefaults(email);
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  login(user: PatientsInterface) {
    this.patientService.getPatient().subscribe(patientData => {
      patientData.map(pat => {
        if (user.email === pat.email && user.password === pat.password) {
          this.emailLogin(user.email, user.password).then();
        }
      });
    });
  }

  signUp(user: PatientsInterface) {
    if (user.email !== '' && user.password !== '') {
      return this.emailSignUp(user.email, user.password)
        .then((success) => {
          if (success === true) {
            this.router.navigate(['/login']).then();
            return this.patientService.addPatient(user);
          } else {
            return false;
          }
        });
    }
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.apiService._loggedIn.next(false);
      this.router.navigate(['/login'], { relativeTo: this.route }).then();
    });
  }

}
