import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { PatientService } from '../../../../services/patient.service';

@Component({
  selector: 'app-family-members',
  templateUrl: './family-members.component.html',
  styleUrls: ['./family-members.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FamilyMembersComponent implements OnInit {

  title: string;
  public selectedMembers = [];

  constructor(private patientService: PatientService,
              public dialogRef: MatDialogRef<FamilyMembersComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.selectedMembers = data.selectedMembers;
  }

  ngOnInit() {
  }

  public getFilteredMembers() {
    return this.selectedMembers;
  }

  public save() {
    this.dialogRef.close(this.getFilteredMembers());
  }

}
