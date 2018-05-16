import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs/util/pipe';
import 'rxjs/add/operator/finally';
import {ApiOptionInterface, SelectsListInterface} from '../interfaces/selects.interface';
import {DemographicsInterface} from '../interfaces/demographics.interface';


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

  demographics$: Observable<DemographicsInterface[]>;

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
    return this.apiService.getPageData(url, this.demographics$);
  }

  updatePageData(formData, url) {
    return this.apiService.updateData(formData, url);
  }
}
