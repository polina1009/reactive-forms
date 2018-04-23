import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormModule} from './pages/forms-page';
import { FamilyHistoryModule } from './pages/family-history';
import {ApiService} from './services/api.service';
import { FamilyMembersComponent } from './pages/family-history/components/family-members/family-members.component';



@NgModule({
  declarations: [
    AppComponent,
    FamilyMembersComponent,
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
