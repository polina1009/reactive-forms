import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs/util/pipe';
import 'rxjs/add/operator/delay';

import {
  GET_PATIENT,
  GET_DEFAULT_PAGE,
  GET_DEFAULT_PAGE_ID,
  GET_DEMOGRAPHICS,
  GET_MEDICAL_HISTORY,
  GET_OCULAR_HISTORY,
  GET_MEDICATIONS,
  GET_FAMILY_HISTORY} from '../constants/api.constants';
import { FIELD_PATH_ID, FIELD_PATH_INDEX, DISPLAY_ORDER } from '../constants/field.constants';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { ApiOptionInterface} from '../interfaces/selects.interface';
import { DefaultInterface, PatientsInterface } from '../interfaces/patient.interface';
import { DemographicsInterface } from '../interfaces/demographics.interface';
import { MedicalHistoryInterface } from '../interfaces/medical-history.interface';
import { OcularHistoryInterface } from '../interfaces/ocular-history.inteface';
import { ApiToggleInterface } from '../interfaces/toggle.interface';
import { MedicationsInterface } from '../interfaces/medications.interface';
import { FamilyHistoryInterface } from '../interfaces/family-history.interface';



@Injectable()

export class ApiService {
  patientCollection: AngularFirestoreCollection<PatientsInterface>;
  patient$: Observable<PatientsInterface[]>;

  defaultCollection: AngularFirestoreCollection<DefaultInterface>;
  defaultDoc: AngularFirestoreDocument<DefaultInterface>;

  selectionCollection: AngularFirestoreCollection<ApiOptionInterface>;
  select$: Observable<ApiOptionInterface[]>;

  toggleCollection: AngularFirestoreCollection<ApiToggleInterface>;
  toggle$: Observable<ApiToggleInterface[]>;

  defaultDemographics$: Observable<DemographicsInterface[]>;
  defaultMedicalHistory$: Observable<MedicalHistoryInterface[]>;
  defaultOcularHistory$: Observable<OcularHistoryInterface[]>;
  defaultMedications$: Observable<MedicationsInterface[]>;
  defaultFamilyHistory$: Observable<FamilyHistoryInterface[]>;

  defaultDemographicsData: DemographicsInterface;
  defaultMedicalHistoryData: MedicalHistoryInterface;
  defaultOcularHistoryData: OcularHistoryInterface;
  defaultMedicationsData: MedicationsInterface;
  defaultFamilyHistoryData: FamilyHistoryInterface[];

  patientDoc: AngularFirestoreDocument<PatientsInterface>;
  pagesDemogDoc: AngularFirestoreDocument<DemographicsInterface>;
  pagesMedHistDoc: AngularFirestoreDocument<MedicalHistoryInterface>;
  pagesOculHistgDoc: AngularFirestoreDocument<OcularHistoryInterface>;
  pagesMedDoc: AngularFirestoreDocument<MedicationsInterface>;
  pageFamilyHist: AngularFirestoreCollection<FamilyHistoryInterface>;
  patientId: string;
  pageId: string;

  public _loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this._loggedIn.asObservable();
  }

  constructor(private afs: AngularFirestore, private router: Router) {
    this.patientCollection = this.afs.collection(GET_PATIENT);
    this.patientDoc = this.afs.doc<PatientsInterface>(`${GET_PATIENT}/${this.patientId}`);
    this.defaultCollection = this.afs.collection(GET_DEFAULT_PAGE);
    this.getDefaultPage();
  }

  updateJustSignUpUserWithDefaults(searchFields) {
    const ref: any = this.patientCollection.ref;

    ref.where('email', '==', searchFields)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.get()
            .then(userRef => {
              const userData = userRef.data();
              userData.id = userRef.id;
              this.patientId = userData.id;
              this.addCollection();
              return userData;
            });
        });
      });
  }

  getLoggedUserWithCurrentData(searchFields) {
    const ref: any = this.patientCollection.ref;

    ref.where('email', '==', searchFields)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.get()
            .then(userRef => {
              const userData = userRef.data();
              userData.id = userRef.id;
              this.patientId = userData.id;
              this.router.navigate(['/']).then();
              this._loggedIn.next(true);
              return userData;
            });
        });
      });
  }

  getPatientColl() {
    this.patient$ = this.patientCollection.snapshotChanges()
      .map((actions) => {
        return actions.map(action => {
          return action.payload.doc.data();
        });
      });
    return this.patient$;
  }

  get patient() {
    return this.patientDoc = this.afs.doc<PatientsInterface>(`${GET_PATIENT}/${this.patientId}`);
  }

  get defaultPage() {
    return this.defaultDoc = this.afs.doc<DefaultInterface>(`${GET_DEFAULT_PAGE_ID}`);
  }

  addPatient(patient: PatientsInterface) {
    this.patientCollection.add(patient).then();
  }

  addCollection() {
    this.patient.collection(GET_DEMOGRAPHICS).add(this.defaultDemographicsData).then();
    this.patient.collection(GET_MEDICAL_HISTORY).add(this.defaultMedicalHistoryData).then();
    this.patient.collection(GET_OCULAR_HISTORY).add(this.defaultOcularHistoryData).then();
    this.patient.collection(GET_MEDICATIONS).add(this.defaultMedicationsData).then();
    this.defaultFamilyHistoryData.map(data => {
      this.patient.collection(GET_FAMILY_HISTORY).add(data).then();
    });
  }

  getSelectCollection(url: string) {
    this.selectionCollection = this.afs.collection(url, ref => ref.orderBy(FIELD_PATH_ID, DISPLAY_ORDER));
    this.select$ = this.selectionCollection.valueChanges();
    return this.select$;
  }

  getToggleList(url: string) {
    this.toggleCollection = this.afs.collection(url, ref => ref.orderBy(FIELD_PATH_INDEX, DISPLAY_ORDER));
    this.toggle$ = this.toggleCollection.valueChanges();
    return this.toggle$;
  }

  getPageData(url: string, query?) {
    query = this.patient.collection(url, ref => ref.orderBy(FIELD_PATH_INDEX, DISPLAY_ORDER)).snapshotChanges()
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

  getDefPageData(url: string, query?) {
    query = this.defaultPage.collection(url, ref => ref.orderBy(FIELD_PATH_INDEX, DISPLAY_ORDER)).valueChanges();
    return query;
  }

  getDefaultPage() {
    this.getDefPageData(GET_DEMOGRAPHICS, this.defaultDemographics$).subscribe(data => {
      data.map(d => {
        this.defaultDemographicsData = d;
      });
    });
    this.getDefPageData(GET_MEDICAL_HISTORY, this.defaultMedicalHistory$).subscribe(data => {
      data.map(d => {
        this.defaultMedicalHistoryData = d;
      });
    });
    this.getDefPageData(GET_OCULAR_HISTORY, this.defaultOcularHistory$).subscribe(data => {
      data.map(d => {
        this.defaultOcularHistoryData = d;
      });
    });
    this.getDefPageData(GET_MEDICATIONS, this.defaultMedications$).subscribe(data => {
      data.map(d => {
        this.defaultMedicationsData = d;
      });
    });
    this.getDefPageData(GET_FAMILY_HISTORY, this.defaultFamilyHistory$).subscribe(data => {
      this.defaultFamilyHistoryData = data;
    });
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
