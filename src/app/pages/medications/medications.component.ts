import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {FormGroup, FormBuilder, FormArray} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {NavigationService} from '../../services/navigation.service';
import {PatientService} from '../../services/patient.service';
import { GET_MEDICATIONS } from '../../services/api.constants';
import {MedicationsInterface} from '../../interfaces/medications.interface';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MedicationsComponent implements OnInit, OnDestroy {

  medicationsForm: FormGroup;
  medications: FormArray;
  private navNextSubscribe: Subscription;

  public maskDate = {
    guide: true,
    showMask : false,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  };
  public pageData: MedicationsInterface[];

  constructor(
    private fb: FormBuilder,
    private navService: NavigationService,
    private ref: ChangeDetectorRef,
    private patientService: PatientService
  ) {
    this.createForm();
  }

  get controls() {
    return this.medicationsForm.controls;
  }

  createForm() {
    this.medications = this.fb.array([this.createMedications()]);

    this.medicationsForm = this.fb.group({
      comments: this.fb.control(''),
      takeAnyMedications: this.fb.control(''),
      medications: this.medications
    });
  }

  createMedications(): FormGroup {
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

  getMedicationsData() {
    this.patientService.getMedications(GET_MEDICATIONS).subscribe((page) => {
      this.pageData = page;
      this.pageData.map(p => {
        this.setFormData(p);
      });
    });
  }

  addMedications() {
    const arrayControl = this.medicationsForm.get('medications') as FormArray;
    arrayControl.push(this.createMedications());
  }

  deleteMedications(index: number) {
    const control = this.medicationsForm.get('medications') as FormArray;
    control.removeAt(index);
  }

  ngOnInit() {
    this.getMedicationsData();
    this.patientService.updateMedications(this.medicationsForm.value, GET_MEDICATIONS);
    this.navNextSubscribe = this.navService.navButtonClick.subscribe((eventData) => {
      const { navUrl, currentUrl } = eventData;
      if (!(currentUrl.match(/medications/))) {
        return;
      }
      this.navService.preparationAndDisplayFormData(navUrl, this.medicationsForm.value);
    });
  }

  ngOnDestroy() {
    this.navNextSubscribe.unsubscribe();
  }

}
