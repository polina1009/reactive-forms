import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs/util/pipe';
import 'rxjs/add/operator/finally';

import { ApiOptionInterface, SelectsListInterface } from '../interfaces/selects.interface';
import { DemographicsInterface } from '../interfaces/demographics.interface';
import { MedicalHistoryInterface } from '../interfaces/medical-history.interface';
import { OcularHistoryInterface } from '../interfaces/ocular-history.inteface';
import { ApiToggleInterface, ToggleInterface } from '../interfaces/toggle.interface';
import { MedicationsInterface } from '../interfaces/medications.interface';
import { FamilyHistoryInterface } from '../interfaces/family-history.interface';


@Injectable()
export class PatientService {
  demographics$: Observable<DemographicsInterface[]>;
  medicalHistory$: Observable<MedicalHistoryInterface[]>;
  ocularHistory$: Observable<OcularHistoryInterface[]>;
  medications$: Observable<MedicationsInterface[]>;
  familyHistory$: Observable<FamilyHistoryInterface[]>;

  constructor(private apiService: ApiService) {
  }

  public getPatient() {
    return this.apiService.getPatientColl();
  }

  public addPatient(patient) {
    return this.apiService.addPatient(patient);
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

  public getToggleList(url) {
    return this.apiService.getToggleList(url)
      .pipe(
        map((list: ApiToggleInterface[]) => {
          return list.map((item): ToggleInterface => {
            return {
              index: item.index,
              groupName: item.id,
              value: item.name,
              isSelected: item.isSelected
            };
          });
        })
      );
  }

  public getDemographics(url) {
    return this.apiService.getPageData(url, this.demographics$);
  }

  public getMedicalHistory(url) {
    return this.apiService.getPageData(url, this.medicalHistory$);
  }

  public getOcularHistory(url) {
    return this.apiService.getPageData(url, this.ocularHistory$);
  }

  public getMedications(url) {
    return this.apiService.getPageData(url, this.medications$);
  }

  public getFamilyHistory(url) {
    return this.apiService.getPageData(url, this.familyHistory$);
  }

  public updateDemographicsData(formData, url) {
    return this.apiService.updateDemographics(formData, url);
  }

  public updateMedicalHistory(formData, url) {
    return this.apiService.updateMedicalHistory(formData, url);
  }

  public updateOcularHistory(formData, url) {
    return this.apiService.updateOcularHistory(formData, url);
  }

  public updateMedications(formData, url) {
    return this.apiService.updateMedications(formData, url);
  }

  public updateFamilyHistory(formData, url) {
    return this.apiService.updateFamilyHistory(formData, url);
  }
}
