import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {PatientService} from './patient.service';
import {PatientsInterface} from '../interfaces/patient.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {ApiService} from './api.service';
import {DemographicsInterface} from '../interfaces/demographics.interface';
import {OcularHistoryInterface} from '../interfaces/ocular-history.inteface';
import {MedicationsInterface} from '../interfaces/medications.interface';
import {MedicalHistoryInterface} from '../interfaces/medical-history.interface';
import {FamilyHistoryInterface} from '../interfaces/family-history.interface';

@Injectable()
export class LoginService {
  patient: Observable<PatientsInterface | null>;
  // private _loggedIn = new BehaviorSubject<boolean>(false);
  //
  // get isLoggedIn() {
  //   return this._loggedIn.asObservable();
  // }

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
        this.apiService.updateJustLoggedUserWithDefaults(email);
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
          // this._loggedIn.next(true);
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
