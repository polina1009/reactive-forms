import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PatientService } from './patient.service';

@Component({
  selector: 'app-forms-page',
  templateUrl: './forms-page.component.html',
  styleUrls: ['./forms-page.component.css'],
})

export class FormsPageComponent implements  OnInit {
  public options = [1, 2, 3];
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
  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.inputGroup = this.fb.group({
      title: '',
      firstName: '',
      lastName: '',
      cellPhone: '',
      home: '',
      work: '',
      email: '',
      preferredContact: '',
      address: '',
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
  }


  ngOnInit() {
  }

}

