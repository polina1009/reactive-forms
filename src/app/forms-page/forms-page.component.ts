import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forms-page',
  templateUrl: './forms-page.component.html',
  styleUrls: ['./forms-page.component.css'],
})

export class FormsPageComponent implements  OnInit {
  public options = [1, 2, 3];
  inputGroup: FormGroup;

  public cellPhone = '';
  public homePhone = '';
  public workPhone = '';
  public dateOfBirth = '';
  public mask: any[]  = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskDate: any[] = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

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

