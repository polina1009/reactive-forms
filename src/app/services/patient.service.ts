import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import {ApiPatientInterface, ApiSelectInterface, PatientInterface, SelectOptionInterface} from '../form.interface';
// import { SelectInterface } from '../interfaces/selects.interface';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs/util/pipe';
import 'rxjs/add/operator/finally';


@Injectable()
export class PatientService {
  public defaultPatient = {
    title: '',
    firstName: '',
    lastName: '',
    cellPhone: '',
    home: '',
    work: '',
    email: '',
    preferredContact: '',
    address1: '',
    address2: '',
    zip: '',
    city: '',
    state: '',
    dateOfBirth: '',
    ssn: '',
    referralSource: '',
    language: '',
    workStatus: '',
    employer: '',
    race: '',
    ethnicity: '',
    gender: '',
  };

  constructor(private apiService: ApiService) {
  }

  // getSelOptions () {
  //   this.apiService.getCollection$();
  // }

  public getSelectionList(url) {
    return this.apiService.get(url)
      .pipe(
        map((list: ApiSelectInterface[]) => {
          return list.map((item): SelectOptionInterface => {
            return {
              value: item.id,
              viewValue: item.name
            };
          });
        })
      );
  }

  getPatients(url) {
    return this.apiService.get(url);
  }
}
