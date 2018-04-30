import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoginComponent } from './login.component';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  exports: [LoginComponent]
})
export class LoginModule { }
