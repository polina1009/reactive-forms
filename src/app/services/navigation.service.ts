import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/';

@Injectable()
export class NavigationService {

  constructor() { }

  private formControlValue$ = new Subject();
  formControlValue = this.formControlValue$.asObservable();

  changeFormValue() {
    console.log(this.formControlValue, '!!!!!!!!!!!!!!!');
    this.formControlValue$.next();
  }

}
