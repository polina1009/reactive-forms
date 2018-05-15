import { Injectable } from '@angular/core';
import { mock_data } from '../mock-data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs/util/pipe';
import 'rxjs/add/operator/delay';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { OptionInterface} from '../interfaces/selects.interface';
import { PatientsInterface } from '../interfaces/patient.interface';
import {DemographicsInterface} from '../interfaces/demographics.interface';


@Injectable()

export class ApiService {
  selectionCollection: AngularFirestoreCollection<OptionInterface>;
  select$: Observable<OptionInterface[]>;

  patientDoc: AngularFirestoreDocument<PatientsInterface>;
  demographics$: Observable<DemographicsInterface[]>;

  constructor(private afs: AngularFirestore) {
  }

  getCollection(url: string) {
    this.selectionCollection = this.afs.collection(url, ref => ref.orderBy('id', 'asc'));
    this.select$ = this.selectionCollection.valueChanges();
    return this.select$;
  }

  getPageCollection() {
    this.patientDoc = this.afs.doc<PatientsInterface>('patients/1');
    this.demographics$ = this.patientDoc.collection<DemographicsInterface>('demographics').valueChanges();
    return this.demographics$;
  }

  // getPatient() {
  //   this.patientCollection = this.afs.collection('patients');
  //   this.pat$ = this.patientCollection.valueChanges();
  //   return this.pat$;
  //   // this.pat$ = this.patientCollection.valueChanges();
  //   // return this.pat$;
  // }

  public get(url: string, query?): Observable<any> {
    return Observable.of(JSON.stringify(mock_data[url]))
      .pipe(
        map((data) => JSON.parse(data))
      )
      .delay(500);
  }
}
