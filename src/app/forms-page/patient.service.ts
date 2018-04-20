import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import {ApiSelectInterface, PatientInterface, SelectOptionInterface} from '../form.interface';
import {Observable} from 'rxjs/Observable';
import { map, filter} from 'rxjs/operators';
import { pipe } from 'rxjs/util/pipe';
import 'rxjs/add/operator/finally';



@Injectable()
export class PatientService {

  // patients: Observable<PatientInterface>;

  constructor(private apiService: ApiService) {
  }

  public getPreferredContactList(): Observable<SelectOptionInterface[]> {
    return this.apiService.getPreferredContactList()
      .pipe(
        map((contactList: ApiSelectInterface[]) => {
          return contactList.map((cont): SelectOptionInterface => {
            return {
              value: cont.id,
              viewValue: cont.name
            };
          });
        })
      );
  }

  public getReferralSourcesList(): Observable<SelectOptionInterface[]> {
    return this.apiService.getReferralSourceList()
      .pipe(
        map((sourcesList: ApiSelectInterface[]) => {
          return sourcesList.map((sources): SelectOptionInterface => {
            return{
              value: sources.id,
              viewValue: sources.name
            };
          });
        })
      );
  }

  public getLanguageList(): Observable<SelectOptionInterface[]> {
    return this.apiService.getLanguageList()
      .pipe(
        map((langList: ApiSelectInterface[]) => {
          return langList.map((lang): SelectOptionInterface => {
            return{
              value: lang.id,
              viewValue: lang.name
            };
          });
        })
      );
  }

  public getWorkStatusList(): Observable<SelectOptionInterface[]> {
    return this.apiService.getWorkStatusList()
      .pipe(
        map((workStatusList: ApiSelectInterface[]) => {
          return workStatusList.map((workStatus): SelectOptionInterface => {
            return{
              value: workStatus.id,
              viewValue: workStatus.name
            };
          });
        })
      );
  }

  public getRaceList(): Observable<SelectOptionInterface[]> {
    return this.apiService.getRaceList()
      .pipe(
        map((raceList: ApiSelectInterface[]) => {
          return raceList.map((race): SelectOptionInterface => {
            return{
              value: race.id,
              viewValue: race.name
            };
          });
        })
      );
  }

  public getEthnicityList(): Observable<SelectOptionInterface[]> {
    return this.apiService.getEthnicityList()
      .pipe(
        map((ethnicityList: ApiSelectInterface[]) => {
          return ethnicityList.map((eth): SelectOptionInterface => {
            return{
              value: eth.id,
              viewValue: eth.name
            };
          });
        })
      );
  }

  getPatients(): Observable<PatientInterface> {
    return this.apiService.getPatient();
  }

  setPatient(patient: PatientInterface) {
    return Observable.of(JSON.stringify(patient));
  }


}
