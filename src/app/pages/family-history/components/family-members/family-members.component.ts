import {Component, OnInit, Inject, ViewEncapsulation} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-family-members',
  templateUrl: './family-members.component.html',
  styleUrls: ['./family-members.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FamilyMembersComponent implements OnInit {

  title: string;
  public selectedMembers = [];

  constructor(public dialogRef: MatDialogRef<FamilyMembersComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.selectedMembers = data.selectedMembers;
  }
  ngOnInit() {
  }

  getFilteredMembers() {
    // return this.selectedMembers.filter(member => member.isSelected);
    return this.selectedMembers;
  }

  save() {
    this.dialogRef.close(this.getFilteredMembers());
  }

}
