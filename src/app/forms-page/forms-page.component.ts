import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Input, OnChanges} from '@angular/core';
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
  public patient: PatientInterface;

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
    this.createForm();
  }

  get controls() {
    return this.inputGroup.controls;
  }

  ngOnInit() {
    this.createForm();
    this.getSelectOptions();
    this.getPatient();

  }

  public createForm() {
    this.inputGroup = this.fb.group({
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
  }

  getPatient() {
    this.patientService.getPatients()
      .subscribe(patient => {
        this.ref.markForCheck();
        this.patient = patient;

        this.updateForm();
        console.log(this.patient);
        this.setPatient();
      });
  }

  setPatient() {
    console.log(this.patientService.setPatient(this.patient))
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

    this.patientService.getPreferredContactList()
      .subscribe(optionList => {
        this.ref.markForCheck();
        this.preferredContactList = optionList;
        this.controls.preferredContact.setValue(this.patient.preferredContact);
    });

    this.patientService.getReferralSourcesList()
      .subscribe(optionList => {
        this.ref.markForCheck();
        this.referrelSourceList = optionList;
        this.controls.referralSource.setValue(this.patient.referralSource);
    });

    this.patientService.getLanguageList()
      .subscribe(optionList => {
        this.ref.markForCheck();
        this.languageList = optionList;
        this.controls.language.setValue(this.patient.language);
      });

    this.patientService.getWorkStatusList()
      .subscribe(optionList => {
        this.ref.markForCheck();
        this.workStatusList = optionList;
        this.controls.workStatus.setValue(this.patient.workStatus);
    });

    this.patientService.getRaceList()
      .subscribe(optionList => {
        this.ref.markForCheck();
        this.raceList = optionList;
        this.controls.race.setValue(this.patient.race);
    });

    this.patientService.getEthnicityList()
      .subscribe(optionList => {
        this.ref.markForCheck();
        this.ethnicityList = optionList;
        this.controls.ethnicity.setValue(this.patient.ethnicity);
    });
  }

}

