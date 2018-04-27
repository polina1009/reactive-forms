import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FamilyHistoryComponent } from './family-history.component';
import { FamilyMembersComponent } from './components';
import {FamilyHistoryService} from './family-history.service';
import { FamilyHistoryPipe } from './family-history.pipe';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  declarations: [
    FamilyHistoryComponent,
    FamilyMembersComponent,
    FamilyHistoryPipe
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
