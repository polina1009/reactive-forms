import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FamilyHistoryComponent } from './family-history.component';
import { FamilyMembersComponent } from './components';
import {FamilyHistoryService} from './family-history.service';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MatSlideToggleModule,
    MatDialogModule,
    FlexLayoutModule
  ],
  declarations: [
    FamilyHistoryComponent,
    FamilyMembersComponent,
  ],
  entryComponents: [
    FamilyMembersComponent
  ],
  providers: [FamilyHistoryService],
  exports: [
    FamilyHistoryComponent,
    FamilyMembersComponent
  ]
})
export class FamilyHistoryModule { }
