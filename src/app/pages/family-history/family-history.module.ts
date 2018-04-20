import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FamilyHistoryComponent } from './family-history.component';
import {FamilyHistoryService} from './family-history.service';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    FamilyHistoryComponent
  ],
  providers: [
    FamilyHistoryService
  ],
  exports: [
    FamilyHistoryComponent
  ]
})
export class FamilyHistoryModule { }
