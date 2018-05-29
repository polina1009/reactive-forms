import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { NavigationService } from '../../services/navigation.service';
import { PatientService } from '../../services/patient.service';

import { GET_MEDICATIONS } from '../../constants/api.constants';

import { MedicationsInterface } from '../../interfaces/medications.interface';
import { maskDate } from '../../configes/text-mask.conf';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MedicationsComponent implements OnInit, OnDestroy {

  public medicationsForm: FormGroup;
  public medications: FormArray;
  private navNextSubscribe: Subscription;

  public maskDate = maskDate;
  public pageData: MedicationsInterface[];

  get controls() {
    return this.medicationsForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private navService: NavigationService,
    private ref: ChangeDetectorRef,
    private patientService: PatientService
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.getMedicationsData();
    this.navToNextSubscription();
  }

  ngOnDestroy() {
    this.navNextSubscribe.unsubscribe();
  }

  public createForm() {
    this.medications = this.fb.array([this.createMedications()]);

    this.medicationsForm = this.fb.group({
      comments: this.fb.control(''),
      takeAnyMedications: this.fb.control(''),
      medications: this.medications
    });
  }

  public addMedications() {
    const arrayControl = this.medicationsForm.get('medications') as FormArray;
    arrayControl.push(this.createMedications());
  }

  public deleteMedications(index: number) {
    const control = this.medicationsForm.get('medications') as FormArray;
    control.removeAt(index);
  }

  private createMedications(): FormGroup {
    return this.fb.group({
      name: this.fb.control(''),
      startDate: this.fb.control(''),
      current: this.fb.control(''),
      stopDate: this.fb.control('')
    });
  }

  private setFormData(pageData) {
    const medications = this.medicationsForm.get('medications') as FormArray;
    medications.removeAt(0);

    this.controls.comments.setValue(pageData.comments);
    this.controls.takeAnyMedications.setValue(pageData.takeAnyMedications);
    this.controls.medications.patchValue(pageData.medications);
    pageData.medications.forEach(m => medications.push(this.fb.group(m)));
  }

  private getMedicationsData() {
    this.patientService.getMedications(GET_MEDICATIONS).subscribe((page) => {
      this.pageData = page;
      this.pageData.map(p => {
        this.setFormData(p);
      });
    });
  }

  private navToNextSubscription() {
    return this.navNextSubscribe = this.navService.navButtonClick.subscribe((eventData) => {
      const { navUrl, currentUrl } = eventData;
      if (!(currentUrl.match(/medications/))) {
        return;
      }
      this.patientService.updateMedications(this.medicationsForm.value, GET_MEDICATIONS);
      this.navService.preparationAndDisplayFormData(navUrl);
    });
  }

}
