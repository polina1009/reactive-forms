import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {FamilyHistoryRoutingModule} from './family-history-routing.module';

import { FamilyHistoryComponent } from './family-history.component';
import {FamilyHistoryService} from './family-history.service';
import { PageNotFoundComponent } from './components/page-not-found';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    FamilyHistoryRoutingModule
  ],
  declarations: [
    FamilyHistoryComponent,
    PageNotFoundComponent
  ],
  providers: [
    FamilyHistoryService
  ],
  exports: [
    FamilyHistoryComponent
  ]
})
export class FamilyHistoryModule { }
