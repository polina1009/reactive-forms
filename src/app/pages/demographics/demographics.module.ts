import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatDatepickerModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatRadioModule,
  MatSelectModule,
  MatAutocompleteModule
} from '@angular/material';

import { TextMaskModule } from 'angular2-text-mask';

import {DemographicsComponent} from './demographics.component';




@NgModule({
  declarations: [
    DemographicsComponent,
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
  providers: [],
  exports: [
    DemographicsComponent,
  ],
})
export class DemographicsModule { }
