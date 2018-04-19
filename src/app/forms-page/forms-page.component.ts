import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PatientService } from './patient.service';
import {SelectOptionInterface, PatientInterface} from '../form.interface';

@Component({
  selector: 'app-forms-page',
  templateUrl: './forms-page.component.html',
  styleUrls: ['./forms-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormsPageComponent implements  OnInit {
  public preferredContactList: SelectOptionInterface[];
  public referrelSourceList: SelectOptionInterface[];
  public languageList: SelectOptionInterface[];
  public workStatusList: SelectOptionInterface[];
  public raceList: SelectOptionInterface[];
  public ethnicityList: SelectOptionInterface[];

  inputGroup: FormGroup;

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
    private ref: ChangeDetectorRef
  ) {
    this.preferredContactList = [];
    this.referrelSourceList = [];
    this.languageList = [];
    this.workStatusList = [];
    this.raceList = [];
    this.ethnicityList = [];
  }

  ngOnInit() {
    this.createForm();
    this.getSelectOptions();
    console.log(this.inputGroup.value);
  }

  public createForm() {
    this.inputGroup = this.fb.group({
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
      gender: ''
    });
    console.log(this.inputGroup.get('title').value);
  }

  private getSelectOptions() {

    this.patientService.getPreferredContactList().subscribe(optionList => {
      this.ref.markForCheck();
      this.preferredContactList = optionList;
    });

    this.patientService.getReferralSourcesList().subscribe(optionList => {
      this.ref.markForCheck();
      this.referrelSourceList = optionList;
    });

    this.patientService.getLanguageList().subscribe(optionList => {
      this.ref.markForCheck();
      this.languageList = optionList;
    });

    this.patientService.getWorkStatusList().subscribe(optionList => {
      this.ref.markForCheck();
      this.workStatusList = optionList;
    });

    this.patientService.getRaceList().subscribe(optionList => {
      this.ref.markForCheck();
      this.raceList = optionList;
    });

    this.patientService.getEthnicityList().subscribe(optionList => {
      this.ref.markForCheck();
      this.ethnicityList = optionList;
    });
  }

}

