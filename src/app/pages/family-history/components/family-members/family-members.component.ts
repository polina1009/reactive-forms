import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {allMembers} from '../../family-hystory-data';

@Component({
  selector: 'app-family-members',
  templateUrl: './family-members.component.html',
  styleUrls: ['./family-members.component.css']
})
export class FamilyMembersComponent implements OnInit {

  title: string;
  public allMembers = allMembers;

  constructor(
    public dialogRef: MatDialogRef<FamilyMembersComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    // console.log(data);
    this.title = data.title;
  }
  ngOnInit() {
    this.getFiltredMemders();
  }

  getFiltredMemders() {
    return this.allMembers.filter(member => member.isSelected);
  }

  save() {
    this.dialogRef.close(this.getFiltredMemders());
  }

}
