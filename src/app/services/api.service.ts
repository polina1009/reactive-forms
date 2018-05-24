import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs/util/pipe';
import 'rxjs/add/operator/delay';
import { GET_PATIENT, GET_PATIENT_DOC, GET_DEFAULT_PAGE } from './api.constants';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ApiOptionInterface} from '../interfaces/selects.interface';
import {DefaultInterface, PatientsInterface} from '../interfaces/patient.interface';
import {DemographicsInterface} from '../interfaces/demographics.interface';
import {MedicalHistoryInterface} from '../interfaces/medical-history.interface';
import {OcularHistoryInterface} from '../interfaces/ocular-history.inteface';
import {ApiToggleInterface} from '../interfaces/toggle.interface';
import {MedicationsInterface} from '../interfaces/medications.interface';
import {FamilyHistoryInterface} from '../interfaces/family-history.interface';


@Injectable()

export class ApiService {
  patientCollection: AngularFirestoreCollection<PatientsInterface>;
  patient$: Observable<PatientsInterface[]>;

  defaulrDoc: AngularFirestoreDocument<DefaultInterface>;

  selectionCollection: AngularFirestoreCollection<ApiOptionInterface>;
  select$: Observable<ApiOptionInterface[]>;

  toggleCollection: AngularFirestoreCollection<ApiToggleInterface>;
  toggle$: Observable<ApiToggleInterface[]>;

  patientDoc: AngularFirestoreDocument<PatientsInterface>;
  pagesDemogDoc: AngularFirestoreDocument<DemographicsInterface>;
  pagesMedHistDoc: AngularFirestoreDocument<MedicalHistoryInterface>;
  pagesOculHistgDoc: AngularFirestoreDocument<OcularHistoryInterface>;
  pagesMedDoc: AngularFirestoreDocument<MedicationsInterface>;
  pageFamilyHist: AngularFirestoreCollection<FamilyHistoryInterface>;
  defaultPageId: string;
  pageId: string;
  patientId: string;

  constructor(private afs: AngularFirestore) {
    this.patientCollection = this.afs.collection(GET_PATIENT);
    // this.patientDoc = this.afs.doc<PatientsInterface>(`patients/${this.patientId}`);
  }

  updateJustLoggedUserWithDefaults(searchFields) {
    console.log(searchFields);
    const ref: any = this.afs.collection('patients').ref;

    ref.where('email', '==', searchFields)
      .onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          doc.ref.get().then(userRef => {
            const userData = userRef.data();
            userData.id = userRef.id;
            console.log('!!!!!!', userRef.id, userData);
          });
        });
      }).subscribe(data => {
        this.patientId = data.id;
        console.log(data);
    });
  }

  getPatientColl() {
    this.patient$ = this.patientCollection.snapshotChanges()
      .map((actions) => {
        return actions.map(action => {
          const patient = action.payload.doc.data();
          patient.id = action.payload.doc.id;
          return patient;
        });
      });
    return this.patient$;
  }

  addPatient(patient: PatientsInterface) {
    this.patientCollection.add(patient);
  }

  get patient() {
    return this.patientDoc = this.afs.doc<PatientsInterface>(`patients/${this.patientId}`);
  }

  get defaultPage() {
    return this.defaulrDoc = this.afs.doc<DefaultInterface>(GET_DEFAULT_PAGE);
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
    query = this.patient.collection(url, ref => ref.orderBy('index', 'asc')).snapshotChanges()
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

  getDefaultPage(url: string, query?) {
    query = this.defaultPage.collection(url, ref => ref.orderBy('index', 'asc')).snapshotChanges();
      // .map((actions) => {
      //   return actions.map(action => {
      //     const data = action.payload.doc.data();
      //     data.id = action.payload.doc.id;
      //     this.defaultPageId = data.id;
      //     return data;
      //   });
      // });
    return query;
  }



  updateDemographics(formData: DemographicsInterface, url: string) {
    this.pagesDemogDoc = this.patientDoc.collection(url).doc(`${this.pageId}`);
    this.pagesDemogDoc.update(formData);
  }

  updateMedicalHistory(formData: MedicalHistoryInterface, url: string) {
    this.pagesMedHistDoc = this.patientDoc.collection(url).doc(`${this.pageId}`);
    this.pagesMedHistDoc.update(formData);
  }

  updateOcularHistory(formData: OcularHistoryInterface, url: string) {
    this.pagesOculHistgDoc = this.patientDoc.collection(url).doc(`${this.pageId}`);
    this.pagesOculHistgDoc.update(formData);
  }

  updateMedications(formData: MedicationsInterface, url: string) {
    this.pagesMedDoc = this.patientDoc.collection(url).doc(`${this.pageId}`);
    this.pagesMedDoc.update(formData);
  }

  updateFamilyHistory(formData: FamilyHistoryInterface, url: string) {
    this.pageFamilyHist = this.patientDoc.collection(url);
    this.pageFamilyHist.doc(`${formData.id}`).update(formData);
  }
}
