import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs/util/pipe';
import 'rxjs/add/operator/delay';
import { GET_PATIENT } from './api.constants';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ApiOptionInterface} from '../interfaces/selects.interface';
import { PatientsInterface } from '../interfaces/patient.interface';
import {DemographicsInterface} from '../interfaces/demographics.interface';
import {MedicalHistoryInterface} from '../interfaces/medical-history.interface';
import {OcularHistoryInterface} from '../interfaces/ocular-history.inteface';
import {ApiToggleInterface, ToggleInterface} from '../interfaces/toggle.interface';


@Injectable()

export class ApiService {
  selectionCollection: AngularFirestoreCollection<ApiOptionInterface>;
  select$: Observable<ApiOptionInterface[]>;

  toggleCollection: AngularFirestoreCollection<ApiToggleInterface>;
  toggle$: Observable<ApiToggleInterface[]>;

  patientDoc: AngularFirestoreDocument<PatientsInterface>;
  pagesDoc: AngularFirestoreDocument<DemographicsInterface>;
  pageId: string;

  constructor(private afs: AngularFirestore) {
  }

  get patient() {
    return this.patientDoc = this.afs.doc<PatientsInterface>(GET_PATIENT);
  }

  getSelectCollection(url: string) {
    this.selectionCollection = this.afs.collection(url, ref => ref.orderBy('id', 'asc'));
    this.select$ = this.selectionCollection.valueChanges();
    return this.select$;
  }

  getToggleList(url: string) {
    this.toggleCollection = this.afs.collection(url, ref => ref.orderBy('index', 'asc'));
    this.toggle$ = this.toggleCollection.valueChanges();
    return this.toggle$;
  }

  getPageData(url: string, query?) {
    query = this.patient.collection(url).snapshotChanges()
      .map((actions) => {
        return actions.map(action => {
          const data = action.payload.doc.data();
          data.id = action.payload.doc.id;
          this.pageId = data.id;
          return data;
        });
      });
    return query;
  }

  updateDemographics(formData: DemographicsInterface, url: string) {
    this.pagesDoc = this.patientDoc.collection(url).doc(`${this.pageId}`);
    this.pagesDoc.update(formData);
  }

  updateMedicalHistory(formData: MedicalHistoryInterface, url: string) {
    this.pagesDoc = this.patientDoc.collection(url).doc(`${this.pageId}`);
    this.pagesDoc.update(formData);
  }

  updateOcularHistory(formData: OcularHistoryInterface, url: string) {
    this.pagesDoc = this.patientDoc.collection(url).doc(`${this.pageId}`);
    this.pagesDoc.update(formData);
  }
}
