import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserInterface } from '../form.interface';

@Injectable()
export class LoginService {
  private _loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this._loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  login(user: UserInterface) {
    if (user.email !== '' && user.password !== '' ) {
      this._loggedIn.next(true);
      this.router.navigate(['/']);
    }
  }

  logout() {
    this._loggedIn.next(false);
    this.router.navigate(['/login'], { relativeTo: this.route });
  }

}
