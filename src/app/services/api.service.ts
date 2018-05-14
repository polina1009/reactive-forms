import { Injectable } from '@angular/core';
import { mock_data } from '../mock-data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs/util/pipe';
import 'rxjs/add/operator/delay';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { SelectArrInterface } from '../interfaces/selects.interface';


@Injectable()

export class ApiService {
  SelectionCollection: AngularFirestoreCollection<SelectArrInterface>;
  selects: Observable<SelectArrInterface[]>;

  constructor(private afs: AngularFirestore) {
    this.SelectionCollection = this.afs.collection('selectsList');
    this.selects = this.SelectionCollection.valueChanges();
  }

  getSelect() {
    return this.selects;
  }

  public get(url: string, query?): Observable<any> {
    return Observable.of(JSON.stringify(mock_data[url]))
      .pipe(
        map((data) => JSON.parse(data))
      )
      .delay(500);
  }
}

