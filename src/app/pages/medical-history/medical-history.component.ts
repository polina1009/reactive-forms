import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { toggleIllnessList } from './medical-history-data';
import { ToggleIllnessInterface } from './medical-history.interface';
import { NavigationService } from '../../services/navigation.service';
import { Subscription } from 'rxjs/Subscription';
import {PatientService} from '../../services/patient.service';
import { GET_MEDICAL_HISTORY } from '../../services/api.constants'
import {DemographicsInterface} from '../../interfaces/demographics.interface';
import {MedicalHistoryInterface} from '../../interfaces/medical-history.interface';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.scss']
})
export class MedicalHistoryComponent implements OnInit, OnDestroy {
  medicalHistoryForms: FormGroup;
  surgeries: FormArray;
  injuries: FormArray;

  public toggleList: ToggleIllnessInterface[];
  public maskDate = {
    guide: true,
    showMask : false,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  };
  private navNextSubscribe: Subscription;

  public pageData: MedicalHistoryInterface[];


  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private navService: NavigationService
  ) {
    this.toggleList = toggleIllnessList;
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

  createSurgeries(): FormGroup {
    return this.fb.group({
      surgeriesType: '',
      dateOfSurgery: ''
    });
  }

  createInjuries(): FormGroup {
    return this.fb.group({
      typeOfInjury: '',
      dateOfInjury: ''
    });
  }

  private setFormData(pageData) {
    this.controls.surgeries.setValue(pageData.surgeries);
    this.controls.injuries.setValue(pageData.injuries);
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



  addSurgeries(): void {
    const arrayControl = this.medicalHistoryForms.get('surgeries') as FormArray;
    arrayControl.push(this.createSurgeries());
  }

  addInjuries(): void {
    const injuriesArrayControl = this.medicalHistoryForms.get('injuries') as FormArray;
    injuriesArrayControl.push(this.createInjuries());
  }

  deleteGroup(index: number, arr: string) {
    const control = this.medicalHistoryForms.get(arr) as FormArray;
    control.removeAt(index);
  }

  ngOnInit() {
    this.getMedicalHistoryData();
    this.navNextSubscribe = this.navService.navButtonClick.subscribe((eventData) => {
      const { navUrl, currentUrl } = eventData;
      if (!(currentUrl.match(/medical-history/))) {
        return;
      }
      this.patientService.updateMedicalHistory(this.medicalHistoryForms.value, GET_MEDICAL_HISTORY);
      this.navService.preparationAndDisplayFormData(navUrl, this.medicalHistoryForms.value);
      });
  }

  ngOnDestroy () {
    this.navNextSubscribe.unsubscribe();
  }
}
