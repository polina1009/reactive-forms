import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import {ApiPatientInterface, ApiSelectInterface, PatientInterface, SelectOptionInterface} from '../form.interface';
// import { SelectInterface } from '../interfaces/selects.interface';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs/util/pipe';
import 'rxjs/add/operator/finally';
import {ApiOptionInterface, SelectsListInterface} from '../interfaces/selects.interface';


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
    address: '',
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

  public getOptionList(url) {
    return this.apiService.getSelectCollection(url)
      .pipe(
        map((list: ApiOptionInterface[]) => {
          return list.map((item): SelectsListInterface => {
            return {
              value: item.id,
              viewValue: item.name
            };
          });
        })
      );
  }

  getDemographics(url) {
    return this.apiService.getPageCollection(url);
  }

  updatePageData(formData, url) {
    return this.apiService.updateDemographicsData(formData, url);
  }
}
