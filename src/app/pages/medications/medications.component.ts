import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormGroup, FormBuilder, FormArray} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {NavigationService} from '../../services/navigation.service';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.scss']
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

  constructor(
    private fb: FormBuilder,
    public navService: NavigationService
  ) {
    this.createForm();
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

  addMedications() {
    const arrayControl = this.medicationsForm.get('medications') as FormArray;
    arrayControl.push(this.createMedications());
  }

  deleteMedications(index: number) {
    const control = this.medicationsForm.get('medications') as FormArray;
    control.removeAt(index);
  }

  ngOnInit() {
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
