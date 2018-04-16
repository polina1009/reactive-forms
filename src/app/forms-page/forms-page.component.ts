import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms-page',
  templateUrl: './forms-page.component.html',
  styleUrls: ['./forms-page.component.css']
})
export class FormsPageComponent implements OnInit {
  inputGroup: FormGroup;
  states = states;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.inputGroup = this.fb.group({
      name: ['', Validators.required ],
      address: this.fb.group({
        street: '',
        city: '',
        state: ''
      }),
      power: ''
    });
  }


  ngOnInit() {
  }

}

const states = ['Ivan', 'Max', 'John', 'Petya'];

