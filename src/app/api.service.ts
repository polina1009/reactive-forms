import { Injectable } from '@angular/core';
import { preferredContact, referralSource, language, workStatus, ethnicity, race, patient } from './mock-data';
import {ApiSelectInterface, PatientInterface} from './form.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs/util/pipe';
import 'rxjs/add/operator/delay';


@Injectable()

export class ApiService {

  constructor() {
  }

  public getPreferredContactList(): Observable<ApiSelectInterface[]> {
    return Observable.of(JSON.stringify(preferredContact))
      .pipe(
        map((contactList) => JSON.parse(contactList))
      )
      .delay(500);
  }

  public getReferralSourceList(): Observable<ApiSelectInterface[]> {
    return Observable.of(JSON.stringify(referralSource))
      .pipe(
        map((sourcesList) => JSON.parse(sourcesList))
      )
      .delay(500);
  }

  public getLanguageList(): Observable<ApiSelectInterface[]> {
    return Observable.of(JSON.stringify(language))
      .pipe(
        map((languageList) => JSON.parse(languageList))
      )
      .delay(500);
  }

  public getWorkStatusList(): Observable<ApiSelectInterface[]> {
    return Observable.of(JSON.stringify(workStatus))
      .pipe(
        map((workStatusList) => JSON.parse(workStatusList))
      )
      .delay(500);
  }

  public getRaceList(): Observable<ApiSelectInterface[]> {
    return Observable.of(JSON.stringify(race))
      .pipe(
        map((raceList) => JSON.parse(raceList))
      )
      .delay(500);
  }

  public getEthnicityList(): Observable<ApiSelectInterface[]> {
    return Observable.of(JSON.stringify(ethnicity))
      .pipe(
        map((ethnicityList) => JSON.parse(ethnicityList))
      )
      .delay(500);
  }

  public getPatient(): Observable<PatientInterface> {
    return Observable.of(JSON.stringify(patient))
      .pipe(
        map((p) => JSON.parse(p))
      )
      .delay(100);
  }
}

