import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatInputModule} from '@angular/material';

import { FormsPageComponent } from './forms-page.component';



@NgModule({
  declarations: [
    FormsPageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule
  ],
  providers: [],
  exports: [
    FormsPageComponent
  ],
})
export class FormModule { }
