import { Injectable } from '@angular/core';
import { mock_data } from '../mock-data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs/util/pipe';
import 'rxjs/add/operator/delay';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import {SelectArrInterface} from '../interfaces/selects.interface';


@Injectable()

export class ApiService {
  SelectionCollection: AngularFirestoreDocument<any>;
  selects$: Observable<SelectArrInterface[]>;

  constructor(private afs: AngularFirestore) {
    this.SelectionCollection = this.afs.collection('selection').doc('2J4SDDnUmKRV9D7yYrAh');
    this.getCollection$();
  }

  getCollection$() {
    this.selects$ = this.SelectionCollection.snapshotChanges()
      .map((doc) => {
        console.log(doc.payload.get('race'));
      })
      .map((actions) => {
        return actions.map(action => {
          const select = action.payload.doc.data() as SelectArrInterface;
          // select.id = action.payload.doc.id;
          console.log('&&&&&&&', select);
          return select;
        });
      });
  }

  getSelect() {
    return this.selects$;
  }

  public get(url: string, query?): Observable<any> {
    return Observable.of(JSON.stringify(mock_data[url]))
      .pipe(
        map((data) => JSON.parse(data))
      )
      .delay(500);
  }
}
