import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {PatientService} from './patient.service';
import {PatientsInterface} from '../interfaces/patient.interface';
import { firebase } from '@firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {ApiService} from './api.service';

@Injectable()
export class LoginService {
  patient: Observable<PatientsInterface | null>;
  private _loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this._loggedIn.asObservable();
  }

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute,
    private patientService: PatientService,
    private apiService: ApiService
  ) { }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(success => {
        console.log('success', success);
        this.apiService.getLoggedUserWithCurrentData(email);
      })
      .catch(error => {
        console.log(error);
      });
  }

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(success => {
        console.log('success', success);
        this.apiService.updateJustLoggedUserWithDefaults(email);
      })
      .catch(error => {
        console.log(error);
      });
  }

  login(user: PatientsInterface) {
    this.patientService.getPatient().subscribe(patientData => {
      patientData.map(pat => {
        if (user.email === pat.email && user.password === pat.password) {
          this._loggedIn.next(true);
          this.emailLogin(user.email, user.password);
          this.router.navigate(['/']);
        }
      });
    });
  }

  signUp(user: PatientsInterface) {
    if (user.email !== '' && user.password !== '') {
      this.emailSignUp(user.email, user.password);
      this.patientService.addPatient(user);
      this._loggedIn.next(true);
      this.router.navigate(['/']);
      user.email = '';
      user.password = '';
    }
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this._loggedIn.next(false);
      this.router.navigate(['/login'], { relativeTo: this.route });
    });
  }

}
