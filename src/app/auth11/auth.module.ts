import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AuthComponent} from './auth.component';
// import { LoginService } from './login.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  exports: [
    AuthComponent
  ],
})

export class AuthModule { }
