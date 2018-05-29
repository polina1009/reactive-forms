import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MedicalHistoryComponent } from './medical-history.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { TextMaskModule } from 'angular2-text-mask';
import {
  MatButtonModule,
  MatSlideToggleModule,
  MatDatepickerModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
} from '@angular/material';


@NgModule({
  declarations: [MedicalHistoryComponent],
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
    MatNativeDateModule
  ],
  providers: [],
  exports: [MedicalHistoryComponent]
})
export class MedicalHistoryModule { }
