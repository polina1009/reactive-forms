import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MedicalHistoryComponent} from './medical-history.component';
import {MedicalHistoryService} from './medical-history.service';

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
    FlexLayoutModule,
    TextMaskModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule
  ],
  providers: [MedicalHistoryService],
  exports: [MedicalHistoryComponent]
})
export class MedicalHistoryModule { }
