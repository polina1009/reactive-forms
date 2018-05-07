import { Injectable } from '@angular/core';
import { mock_data } from '../mock-data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs/util/pipe';
import 'rxjs/add/operator/delay';


@Injectable()

export class ApiService {

  constructor() {
  }

  public get(url: string, query?): Observable<any> {
    return Observable.of(JSON.stringify(mock_data[url]))
      .pipe(
        map((data) => JSON.parse(data))
      )
      .delay(500);
  }

  public getFormValue(formControlValue): Observable<any> {
    return Observable.of(formControlValue)
      .pipe(
        map((formData) => console.log(formData))
      )
      .delay(500);
  }
}

