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

  // titleChangeLog: string[] = [];

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
    // this.logTitleChange();
  }

  get controls() {
    return this.inputGroup.controls;
  }

  ngOnInit() {
    this.createForm();
    this.getSelectOptions();
    this.getPatient();
    // this.rebuildForm();

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
      gender: this.fb.control('')
    });
  }

  // rebuildForm() {
  //   this.inputGroup.reset({
  //     name: this.patient.title
  //   });
  // }

  // prepareSavePatient(): PatientInterface {
  //   const savePatient = this.inputGroup.setValue({
  //     title: this.patient.title,
  //     firstName: this.patient.firstName,
  //     lastName: this.patient.lastName,
  //     cellPhone: this.patient.cellPhone,
  //     home: this.patient.home,
  //     work: this.patient.work,
  //     email: this.patient.email,
  //     preferredContact: this.patient.preferredContact,
  //     address1: this.patient.address1,
  //     address2: this.patient.address2,
  //     zip: this.patient.zip,
  //     city: this.patient.city,
  //     state: this.patient.state,
  //     dateOfBirth: this.patient.dateOfBirth,
  //     ssn: this.patient.ssn,
  //     referralSource: this.patient.referralSource,
  //     language: this.patient.language,
  //     workStatus: this.patient.workStatus,
  //     employer: this.patient.employer,
  //     race: this.patient.race,
  //     ethnicity: this.patient.ethnicity,
  //     gender: this.patient.gender
  //   });
  //   console.log(savePatient);
  //   // const formModel = this.inputGroup.value;
  //   // const savePatient: PatientInterface = {
  //   //   id: this.patient.id,
  //   //   title: this.patient.title,
  //   //   firstName: formModel.firstName as string,
  //   //   lastName: this.patient.lastName,
  //   //   cellPhone: this.patient.cellPhone,
  //   //   home: this.patient.home,
  //   //   work: this.patient.work,
  //   //   email: this.patient.email,
  //   //   preferredContact: this.patient.preferredContact,
  //   //   address1: this.patient.address1,
  //   //   address2: this.patient.address2,
  //   //   zip: this.patient.zip,
  //   //   city: this.patient.city,
  //   //   state: this.patient.state,
  //   //   dateOfBirth: this.patient.dateOfBirth,
  //   //   ssn: this.patient.ssn,
  //   //   referralSource: this.patient.referralSource,
  //   //   language: this.patient.language,
  //   //   workStatus: this.patient.workStatus,
  //   //   employer: this.patient.employer,
  //   //   race: this.patient.race,
  //   //   ethnicity: this.patient.ethnicity,
  //   //   gender: this.patient.gender
  //   // };
  //   // return savePatient;
  // }

  getPatient() {
    this.patientService.getPatients()
      .subscribe(patient => {
        this.ref.markForCheck();

        this.patient = patient;
      });
  }

  // logTitleChange() {
  //   const nameControl = this.inputGroup.get('title');
  //   nameControl.valueChanges.forEach(
  //     (value: string) => this.titleChangeLog.push(value)
  //   );
  // }

  private getSelectOptions() {

    this.patientService.getPreferredContactList().subscribe(optionList => {
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

          // console.log(this.patient.language);
        // console.log(this.controls);
        this.controls.language.setValue(this.patient.language);
      });

    this.patientService.getWorkStatusList().subscribe(optionList => {
      this.ref.markForCheck();
      this.workStatusList = optionList;
      this.controls.workStatus.setValue(this.patient.workStatus);
    });

    this.patientService.getRaceList().subscribe(optionList => {
      this.ref.markForCheck();
      this.raceList = optionList;
      this.controls.race.setValue(this.patient.race);
    });

    this.patientService.getEthnicityList().subscribe(optionList => {
      this.ref.markForCheck();
      this.ethnicityList = optionList;
      this.controls.ethnicity.setValue(this.patient.ethnicity);
    });
  }

}

