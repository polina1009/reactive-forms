import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { PatientService } from '../../services/patient.service';
import { NavigationService } from '../../services/navigation.service';

import {
  GET_PREFERRED_CONTACT_LIST,
  GET_REFERRAL_SOURCE,
  GET_LANGUAGE,
  GET_WORK_STATUS,
  GET_EMPLOYER,
  GET_RACE,
  GET_ETHNICITY,
  GET_DEMOGRAPHICS
} from '../../constants/api.constants';

import {Subscription} from 'rxjs/Subscription';

import { SelectsListInterface } from '../../interfaces/selects.interface';
import { DemographicsInterface } from '../../interfaces/demographics.interface';

import { maskPhone, maskDate } from '../../configes/text-mask.conf';

@Component({
  selector: 'app-forms-page',
  templateUrl: './forms-page.component.html',
  styleUrls: ['./forms-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormsPageComponent implements  OnInit, OnDestroy {
  public preferredContactList: SelectsListInterface[];
  public referrelSourceList: SelectsListInterface[];
  public languageList: SelectsListInterface[];
  public workStatusList: SelectsListInterface[];
  public employer: SelectsListInterface[];
  public raceList: SelectsListInterface[];
  public ethnicityList: SelectsListInterface[];
  private navNextSubscribe: Subscription;

  private pat: DemographicsInterface;
  public pageData: DemographicsInterface[];

  patientGroup: FormGroup;

  public maskPhone = maskPhone;
  public maskDate = maskDate;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private ref: ChangeDetectorRef,
    private navService: NavigationService,
  ) {
    this.preferredContactList = [];
    this.referrelSourceList = [];
    this.languageList = [];
    this.workStatusList = [];
    this.raceList = [];
    this.ethnicityList = [];
  }

  get controls() {
    return this.patientGroup.controls;
  }

  ngOnInit() {
    this.createForm();
    this.getDemographicsData();
    this.getSelectOptions();
    this.navNextSubscribe = this.navService.navButtonClick.subscribe((eventData) => {
      const { navUrl, currentUrl } = eventData;
      if (!(currentUrl === '/' || currentUrl.match(/demographics/))) {
        return;
      }
      this.patientService.updateDemographicsData(this.patientGroup.value, GET_DEMOGRAPHICS);
      this.navService.preparationAndDisplayFormData(navUrl);
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
      address: this.fb.control(''),
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

  getDemographicsData() {
    this.patientService.getDemographics(GET_DEMOGRAPHICS).subscribe((page) => {
      this.pageData = page;
      this.pageData.map(p => {
        this.pat = p;
        this.setFormData(p);
      });
    });
  }

  private setFormData(pageData) {
    this.controls.title.setValue(pageData.title);
    this.controls.firstName.setValue(pageData.firstName);
    this.controls.lastName.setValue(pageData.lastName);
    this.controls.cellPhone.setValue(pageData.cellPhone);
    this.controls.home.setValue(pageData.home);
    this.controls.work.setValue(pageData.work);
    this.controls.email.setValue(pageData.email);
    this.controls.preferredContact.setValue(pageData.preferredContact);
    this.controls.address.setValue(pageData.address);
    this.controls.address2.setValue(pageData.address2);
    this.controls.zip.setValue(pageData.zip);
    this.controls.city.setValue(pageData.city);
    this.controls.state.setValue(pageData.state);
    this.controls.dateOfBirth.setValue(pageData.dateOfBirth);
    this.controls.ssn.setValue(pageData.ssn);
    this.controls.referralSource.setValue(pageData.referralSource);
    this.controls.language.setValue(pageData.language);
    this.controls.workStatus.setValue(pageData.workStatus);
    this.controls.employer.setValue(pageData.employer);
    this.controls.race.setValue(pageData.race);
    this.controls.ethnicity.setValue(pageData.ethnicity);
    this.controls.gender.setValue(pageData.gender);
  }

  private getSelectOptions() {
    this.patientService.getOptionList(GET_PREFERRED_CONTACT_LIST)
      .subscribe(optionList => {
        this.ref.markForCheck();
        this.preferredContactList = optionList;
        this.controls.preferredContact.setValue(this.pat.preferredContact);
    });

    this.patientService.getOptionList(GET_REFERRAL_SOURCE)
      .subscribe(optionList => {
        this.ref.markForCheck();
        this.referrelSourceList = optionList;
        this.controls.referralSource.setValue(this.pat.referralSource);
    });

    this.patientService.getOptionList(GET_LANGUAGE)
      .subscribe(optionList => {
        this.ref.markForCheck();
        this.languageList = optionList;
        this.controls.language.setValue(this.pat.language);
      });

    this.patientService.getOptionList(GET_WORK_STATUS)
      .subscribe(optionList => {
        this.ref.markForCheck();
        this.workStatusList = optionList;
        this.controls.workStatus.setValue(this.pat.workStatus);
    });

    this.patientService.getOptionList(GET_EMPLOYER)
      .subscribe(optionList => {
        this.ref.markForCheck();
        this.employer = optionList;
        this.controls.workStatus.setValue(this.pat.employer);
      });

    this.patientService.getOptionList(GET_RACE)
      .subscribe(optionList => {
        this.ref.markForCheck();
        this.raceList = optionList;
        this.controls.race.setValue(this.pat.race);
    });

    this.patientService.getOptionList(GET_ETHNICITY)
      .subscribe(optionList => {
        this.ref.markForCheck();
        this.ethnicityList = optionList;
        this.controls.ethnicity.setValue(this.pat.ethnicity);
    });
  }



  ngOnDestroy() {
    this.navNextSubscribe.unsubscribe();
  }

}

