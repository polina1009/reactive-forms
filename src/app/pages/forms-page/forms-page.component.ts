import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import {SelectOptionInterface, PatientInterface} from '../../form.interface';
import {
  GET_PREFERRED_CONTACT_LIST,
  GET_REFERRAL_SOURCE,
  GET_LANGUAGE,
  GET_WORK_STATUS,
  GET_EMPLOYER,
  GET_RACE,
  GET_ETHNICITY,
  GET_PATIENT
} from '../../services/api.constants';
import {map} from 'rxjs/operator/map';
import {NavigationService} from '../../services/navigation.service';
import {MatSnackBar} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-forms-page',
  templateUrl: './forms-page.component.html',
  styleUrls: ['./forms-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormsPageComponent implements  OnInit, OnDestroy {
  public preferredContactList: SelectOptionInterface[];
  public referrelSourceList: SelectOptionInterface[];
  public languageList: SelectOptionInterface[];
  public workStatusList: SelectOptionInterface[];
  public employer: SelectOptionInterface[];
  public raceList: SelectOptionInterface[];
  public ethnicityList: SelectOptionInterface[];
  public patient: PatientInterface;
  private navNextSubscribe: Subscription;

  patientGroup: FormGroup;

  public maskPhone = {
    guide: true,
    showMask: false,
    mask: ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  };
  public maskDate = {
    guide: true,
    showMask : false,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  };

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private ref: ChangeDetectorRef,
    private navService: NavigationService,
    private apiService: ApiService
  ) {
    this.preferredContactList = [];
    this.referrelSourceList = [];
    this.languageList = [];
    this.workStatusList = [];
    this.raceList = [];
    this.ethnicityList = [];
    this.patient = this.patientService.defaultPatient;
  }

  get controls() {
    return this.patientGroup.controls;
  }

  ngOnInit() {
    this.createForm();
    this.getSelectOptions();
    this.getPatient();
    this.navNextSubscribe = this.navService.navButtonClick.subscribe((eventData) => {
      const { navUrl, currentUrl } = eventData;
      if (!(currentUrl === '/' || currentUrl.match(/demographics/))) {
        return;
      }
      this.navService.preparationAndDisplayFormData(navUrl, this.patientGroup.value);
    });


    this.apiService.getSelect().subscribe(s => {
      console.log(s);
    });

  }

  public createForm() {
    this.patientGroup = this.fb.group({
      title: this.fb.control(''),
      firstName: this.fb.control(''),
      lastName: this.fb.control(''),
      cellPhone: this.fb.control(''),
      home: this.fb.control(''),
      work: this.fb.control(''),
      email: this.fb.control(''),
      preferredContact: this.fb.control(''),
      address1: this.fb.control(''),
      address2: this.fb.control(''),
      zip: this.fb.control(''),
      city: this.fb.control(''),
      state: this.fb.control(''),
      dateOfBirth: this.fb.control(''),
      ssn: this.fb.control(''),
      referralSource: this.fb.control(''),
      language: this.fb.control(''),
      workStatus: this.fb.control(''),
      employer: this.fb.control(''),
      race: this.fb.control(''),
      ethnicity: this.fb.control(''),
      gender: this.fb.control(''),
    });
    // console.log(this.patientGroup.value);
  }

  getPatient() {
    this.patientService.getPatients(GET_PATIENT)
      .subscribe(patient => {
        this.ref.markForCheck();
        this.patient = patient;

        this.updateForm();
        this.setPatient();

      });
  }

  setPatient() {
    return JSON.stringify(this.patientGroup.value);
  }
  private updateForm() {
    this.controls.title.setValue(this.patient.title);
    this.controls.firstName.setValue(this.patient.firstName);
    this.controls.lastName.setValue(this.patient.lastName);
    this.controls.cellPhone.setValue(this.patient.cellPhone);
    this.controls.home.setValue(this.patient.home);
    this.controls.work.setValue(this.patient.work);
    this.controls.email.setValue(this.patient.email);
    this.controls.preferredContact.setValue(this.patient.preferredContact);
    this.controls.address1.setValue(this.patient.address1);
    this.controls.address2.setValue(this.patient.address2);
    this.controls.zip.setValue(this.patient.zip);
    this.controls.city.setValue(this.patient.city);
    this.controls.state.setValue(this.patient.state);
    this.controls.dateOfBirth.setValue(this.patient.dateOfBirth);
    this.controls.ssn.setValue(this.patient.ssn);
    this.controls.referralSource.setValue(this.patient.referralSource);
    this.controls.language.setValue(this.patient.language);
    this.controls.workStatus.setValue(this.patient.workStatus);
    this.controls.employer.setValue(this.patient.employer);
    this.controls.race.setValue(this.patient.race);
    this.controls.ethnicity.setValue(this.patient.ethnicity);
    this.controls.gender.setValue(this.patient.gender);
  }

  private getSelectOptions() {

    this.patientService.getSelectionList(GET_PREFERRED_CONTACT_LIST)
      .subscribe(optionList => {
        this.ref.markForCheck();
        this.preferredContactList = optionList;
        this.controls.preferredContact.setValue(this.patient.preferredContact);
    });

    this.patientService.getSelectionList(GET_REFERRAL_SOURCE)
      .subscribe(optionList => {
        this.ref.markForCheck();
        this.referrelSourceList = optionList;
        this.controls.referralSource.setValue(this.patient.referralSource);
    });

    this.patientService.getSelectionList(GET_LANGUAGE)
      .subscribe(optionList => {
        this.ref.markForCheck();
        this.languageList = optionList;
        this.controls.language.setValue(this.patient.language);
      });

    this.patientService.getSelectionList(GET_WORK_STATUS)
      .subscribe(optionList => {
        this.ref.markForCheck();
        this.workStatusList = optionList;
        this.controls.workStatus.setValue(this.patient.workStatus);
    });

    this.patientService.getSelectionList(GET_EMPLOYER)
      .subscribe(optionList => {
        this.ref.markForCheck();
        this.employer = optionList;
        this.controls.workStatus.setValue(this.patient.employer);
      });

    this.patientService.getSelectionList(GET_RACE)
      .subscribe(optionList => {
        this.ref.markForCheck();
        this.raceList = optionList;
        this.controls.race.setValue(this.patient.race);
    });

    this.patientService.getSelectionList(GET_ETHNICITY)
      .subscribe(optionList => {
        this.ref.markForCheck();
        this.ethnicityList = optionList;
        this.controls.ethnicity.setValue(this.patient.ethnicity);
    });
  }



  ngOnDestroy() {
    this.navNextSubscribe.unsubscribe();
  }

}

