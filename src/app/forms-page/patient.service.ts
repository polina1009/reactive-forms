import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import {ApiSelectInterface, SelectOptionInterface} from '../form.interface';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs/util/pipe';

@Injectable()
export class PatientService {

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

}
