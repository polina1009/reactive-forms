import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs/util/pipe';
import 'rxjs/add/operator/delay';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ApiOptionInterface} from '../interfaces/selects.interface';
import { PatientsInterface } from '../interfaces/patient.interface';
import {DemographicsInterface} from '../interfaces/demographics.interface';


@Injectable()

export class ApiService {
  selectionCollection: AngularFirestoreCollection<ApiOptionInterface>;
  select$: Observable<ApiOptionInterface[]>;

  patientDoc: AngularFirestoreDocument<PatientsInterface>;
  pagesDoc: AngularFirestoreDocument<DemographicsInterface>;
  pageId: string;

  constructor(private afs: AngularFirestore) {
  }

  get patient() {
    return this.patientDoc = this.afs.doc<PatientsInterface>('patients/1');
  }

  getSelectCollection(url: string) {
    this.selectionCollection = this.afs.collection(url, ref => ref.orderBy('id', 'asc'));
    this.select$ = this.selectionCollection.valueChanges();
    return this.select$;
  }

  getPageData(url: string, query?) {
    query = this.patient.collection(url).snapshotChanges()
      .map((actions) => {
        return actions.map(action => {
          const data = action.payload.doc.data() as DemographicsInterface;
          data.id = action.payload.doc.id;
          this.pageId = data.id;
          return data;
        });
      });
    return query;
  }

  updateData(formData: DemographicsInterface, url: string) {
    this.pagesDoc = this.patientDoc.collection(url).doc(`${this.pageId}`);
    this.pagesDoc.update(formData);
  }
}
