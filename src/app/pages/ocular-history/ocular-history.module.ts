import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { OcularHistoryComponent } from './ocular-history.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TextMaskModule } from 'angular2-text-mask';
import {
  MatButtonModule,
  MatSlideToggleModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [OcularHistoryComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    TextMaskModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  exports: [OcularHistoryComponent],
  providers: []
})
export class OcularHistoryModule { }
