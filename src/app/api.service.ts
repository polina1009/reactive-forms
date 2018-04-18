import { Injectable } from '@angular/core';
import { formData } from './mock-data';
import { FormSelectInterface } from './form.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()



export class ApiService {

  SelectList: FormSelectInterface[] = formData;
  constructor() {
    // this.getSelectList();
  }
  // getSelectList(): void {
  //   this.SelectList.forEach((el) => console.log(el));
  // }
}


// const myObservable = Observable.of(formData);
// const myObserver = {
//   next: x => console.log('Observer got a next value: ' + x),
//   error: err => console.error('Observer got an error: ' + err),
//   complete: () => console.log('Observer got a complete notification'),
// };
//
// myObservable.subscribe(myObserver);
