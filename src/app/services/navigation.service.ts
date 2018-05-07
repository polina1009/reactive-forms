import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/';

@Injectable()
export class NavigationService {

  constructor() { }

  private formControlValue$ = new Subject();
  formControlValue = this.formControlValue$.asObservable();
  private navigate$ = new Subject<boolean>();
  navigate = this.navigate$.asObservable();

  changeFormValue() {
    this.formControlValue$.next();
  }

  doNavigate(status) {
    if (status) {
      this.navigate$.next();
    }
  }

}
