import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormArray} from '@angular/forms';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.scss']
})
export class MedicationsComponent implements OnInit {

  medicationsForm: FormGroup;
  medications: FormArray;

  public maskDate = {
    guide: true,
    showMask : false,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  };

  constructor(private fb: FormBuilder) {
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
      name: '',
      startDate: '',
      current: '',
      stopDate: ''
    });
  }

  addMedications() {
    const arrayControl = this.medicationsForm.get('medications') as FormArray;
    arrayControl.push(this.createMedications());
  }

  ngOnInit() {
  }

}
