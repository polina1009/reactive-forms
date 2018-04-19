import { Injectable } from '@angular/core';
import { formData, preferredContact } from './mock-data';
import { ApiSelectInterface, SelectOptionInterface} from './form.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { map, filter } from 'rxjs/operators';
import { pipe } from 'rxjs/util/pipe';
import 'rxjs/add/operator/delay';


@Injectable()

// const dataSelect = Observable.of(formData);
//
// const squareValues = pipe(
//   map((val: FormSelectInterface[]) => val),
// );
// const squaredSelect = squareValues(dataSelect);
//
// squaredSelect.subscribe(x => console.log(x));



export class ApiService {

  constructor() {
  }

  public getPreferredContactList(): Observable<ApiSelectInterface[]> {
    return Observable.of(JSON.stringify(preferredContact))
      .pipe(
        map((contactList) => JSON.parse(contactList))
      )
      .delay(500);
  }

}

