import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MedicationsComponent } from './medications.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { TextMaskModule } from 'angular2-text-mask';
import {
  MatButtonModule,
  MatSlideToggleModule,
  MatDatepickerModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatCardModule
} from '@angular/material';



@NgModule({
  declarations: [MedicationsComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    TextMaskModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatCardModule
  ],
  exports: [MedicationsComponent],
  providers: []
})
export class MedicationsModule { }
