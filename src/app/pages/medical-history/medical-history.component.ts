import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { NavigationService } from '../../services/navigation.service';
import { PatientService} from '../../services/patient.service';

import { Subscription } from 'rxjs/Subscription';

import { GET_MEDICAL_HISTORY, GET_MEDICAL_TOGGLE_LIST } from '../../services/api.constants';

import { MedicalHistoryInterface } from '../../interfaces/medical-history.interface';
import { ToggleInterface } from '../../interfaces/toggle.interface';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MedicalHistoryComponent implements OnInit, OnDestroy {
  medicalHistoryForms: FormGroup;
  surgeries: FormArray;
  injuries: FormArray;

  public toggleList: ToggleInterface[];
  public maskDate = {
    guide: true,
    showMask : false,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  };
  private navNextSubscribe: Subscription;

  public pageData: MedicalHistoryInterface[];


  constructor(
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private patientService: PatientService,
    private navService: NavigationService
  ) {
    this.toggleList = [];
    this.createForm();
  }

  get controls() {
    return this.medicalHistoryForms.controls;
  }

  createForm() {
    this.surgeries = this.fb.array([this.createSurgeries()]);
    this.injuries = this.fb.array([this.createInjuries()]);

    this.medicalHistoryForms = this.fb.group({
      surgeries: this.surgeries,
      injuries: this.injuries,
      lastMedicalExam: this.fb.control(''),
      allergies: this.fb.control(''),
      arthritis: this.fb.control(''),
      autoimmuneDisease: this.fb.control(''),
      cancer: this.fb.control(''),
      diabetes: this.fb.control(''),
      headaches: this.fb.control(''),
      hepatitis: this.fb.control(''),
      highCholesterol: this.fb.control(''),
      heartDisease: this.fb.control(''),
      highBloodPressure: this.fb.control(''),
      hiv: this.fb.control(''),
      patientIsPregnant: this.fb.control(''),
      patientIsBreastfeeding: this.fb.control(''),
      thyroidDisease: this.fb.control(''),
      std: this.fb.control(''),
      otherMedicalConditions: this.fb.control('')
    });
  }

  getToggleList() {
    this.patientService.getToggleList(GET_MEDICAL_TOGGLE_LIST).subscribe(toggleList => {
      this.ref.markForCheck();
      this.toggleList = toggleList;
    });
  }

  createSurgeries(): FormGroup {
    return this.fb.group({
      surgeriesType: this.fb.control(''),
      dateOfSurgery: this.fb.control(''),
    });
  }

  createInjuries(): FormGroup {
    return this.fb.group({
      typeOfInjury: this.fb.control(''),
      dateOfInjury: this.fb.control(''),
    });
  }

  private setFormData(pageData) {
    const surgeries = this.medicalHistoryForms.get('surgeries') as FormArray;
    const injuries = this.medicalHistoryForms.get('injuries') as FormArray;
    surgeries.removeAt(0);
    injuries.removeAt(0);

    this.controls.surgeries.patchValue(pageData.surgeries);
    pageData.surgeries.forEach(s => surgeries.push(this.fb.group(s)));
    this.controls.injuries.patchValue(pageData.injuries);
    pageData.injuries.forEach(inj => injuries.push(this.fb.group(inj)));
    this.controls.lastMedicalExam.setValue(pageData.lastMedicalExam);
    this.controls.allergies.setValue(pageData.allergies);
    this.controls.arthritis.setValue(pageData.arthritis);
    this.controls.autoimmuneDisease.setValue(pageData.autoimmuneDisease);
    this.controls.cancer.setValue(pageData.cancer);
    this.controls.diabetes.setValue(pageData.diabetes);
    this.controls.headaches.setValue(pageData.headaches);
    this.controls.hepatitis.setValue(pageData.hepatitis);
    this.controls.highCholesterol.setValue(pageData.highCholesterol);
    this.controls.heartDisease.setValue(pageData.heartDisease);
    this.controls.highBloodPressure.setValue(pageData.highBloodPressure);
    this.controls.hiv.setValue(pageData.hiv);
    this.controls.patientIsPregnant.setValue(pageData.patientIsPregnant);
    this.controls.patientIsBreastfeeding.setValue(pageData.patientIsBreastfeeding);
    this.controls.thyroidDisease.setValue(pageData.thyroidDisease);
    this.controls.std.setValue(pageData.std);
    this.controls.otherMedicalConditions.setValue(pageData.otherMedicalConditions);
  }

  getMedicalHistoryData() {
    this.patientService.getMedicalHistory(GET_MEDICAL_HISTORY).subscribe((page) => {
      this.pageData = page;
      this.pageData.map(p => {
        this.setFormData(p);
      });
    });
  }

  onPushFormGroup(formGroup: FormGroup, control?: string) {
    const arrayControl = this.medicalHistoryForms.get(control) as FormArray;
    arrayControl.push(formGroup);
  }

  addSurgeries(): void {
    this.onPushFormGroup(this.createSurgeries(), 'surgeries', );
  }

  addInjuries(): void {
    this.onPushFormGroup(this.createInjuries(), 'injuries');
  }

  deleteGroup(index: number, arr: string) {
    const control = this.medicalHistoryForms.get(arr) as FormArray;
    control.removeAt(index);
  }

  ngOnInit() {
    this.getToggleList();
    this.getMedicalHistoryData();
    this.navNextSubscribe = this.navService.navButtonClick.subscribe((eventData) => {
      const { navUrl, currentUrl } = eventData;
      if (!(currentUrl.match(/medical-history/))) {
        return;
      }
      this.patientService.updateMedicalHistory(this.medicalHistoryForms.value, GET_MEDICAL_HISTORY);
      this.navService.preparationAndDisplayFormData(navUrl);
      });
  }

  ngOnDestroy () {
    this.navNextSubscribe.unsubscribe();
  }
}
