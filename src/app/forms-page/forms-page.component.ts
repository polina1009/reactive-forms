import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms-page',
  templateUrl: './forms-page.component.html',
  styleUrls: ['./forms-page.component.css']
})
export class FormsPageComponent implements OnInit {
  inputGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.inputGroup = this.fb.group({
      title: ['', Validators.required ],
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

