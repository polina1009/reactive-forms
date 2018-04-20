import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatDatepickerModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatRadioModule,
  MatSelectModule,
} from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { TextMaskModule } from 'angular2-text-mask';

import { FormsPageComponent } from './forms-page.component';
import {PatientService} from './patient.service';




@NgModule({
  declarations: [
    FormsPageComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatRadioModule,
    MatRadioModule,
    MatSelectModule,
    MatAutocompleteModule,
    TextMaskModule,
    FormsModule
  ],
  providers: [PatientService],
  exports: [
    FormsPageComponent,
  ],
})
export class FormModule { }
