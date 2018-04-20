import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormModule} from './pages/forms-page';
import { FamilyHistoryModule } from './pages/family-history';
import {ApiService} from './api.service';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormModule,
    FamilyHistoryModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
