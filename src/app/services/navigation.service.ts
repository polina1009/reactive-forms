import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/';

@Injectable()
export class NavigationService {

  constructor() { }

  private _formControlValue = new Subject<object>();
  formControlValue = this._formControlValue.asObservable();

  changeFormValue() {
    this._formControlValue.next();
  }

}
