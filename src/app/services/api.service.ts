import { Injectable } from '@angular/core';
import { mock_data } from '../mock-data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs/util/pipe';
import 'rxjs/add/operator/delay';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { OptionInterface} from '../interfaces/selects.interface';


@Injectable()

export class ApiService {
  selectionCollection: AngularFirestoreCollection<OptionInterface>;
  select$: Observable<OptionInterface[]>;

  constructor(private afs: AngularFirestore) {
    // this.preferredContactCollection = this.afs.collection('preferredContact', ref => ref.orderBy('id', 'asc'));
  }

  getCollection(url: string) {
    this.selectionCollection = this.afs.collection(url, ref => ref.orderBy('id', 'asc'));
    this.select$ = this.selectionCollection.valueChanges();
    return this.select$;
  }

  public get(url: string, query?): Observable<any> {
    return Observable.of(JSON.stringify(mock_data[url]))
      .pipe(
        map((data) => JSON.parse(data))
      )
      .delay(500);
  }
}
