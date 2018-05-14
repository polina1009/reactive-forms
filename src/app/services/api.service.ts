import { Injectable } from '@angular/core';
import { mock_data } from '../mock-data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs/util/pipe';
import 'rxjs/add/operator/delay';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import {SelectArrInterface, SelectOptionInterface} from '../interfaces/selects.interface';


@Injectable()

export class ApiService {
  SelectionCollection: AngularFirestoreCollection<SelectArrInterface>;
  // selects: Observable<SelectArrInterface[]>;
  race: SelectArrInterface;

  constructor(private afs: AngularFirestore) {
    this.SelectionCollection = this.afs.collection('race');
    // this.selects = this.SelectionCollection.valueChanges();
  }

  getCollection$(): Observable<SelectArrInterface[]> {
    return this.SelectionCollection
      .snapshotChanges().map(actions => {
        return actions.map(a => {
          this.race = a.payload.doc.data() as SelectArrInterface;
          const id = a.payload.doc.id;
          return this.race;
        });
      });
  }

  // getSelect() {
  //  this.race.selectName.map(r => {
  //    console.log(r.name);
  //  });
  //   // return this.selects;
  // }

  public get(url: string, query?): Observable<any> {
    return Observable.of(JSON.stringify(mock_data[url]))
      .pipe(
        map((data) => JSON.parse(data))
      )
      .delay(500);
  }
}
