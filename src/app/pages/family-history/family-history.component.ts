import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import {FamilyMembersComponent} from './components';
import { IllnessInterface } from './family-history.interface';
import { illnessList} from './family-hystory-data';


@Component({
  selector: 'app-family-history',
  templateUrl: './family-history.component.html',
  styleUrls: ['./family-history.component.scss']
})
export class FamilyHistoryComponent implements OnInit {

  public illnessList = illnessList;

  constructor(public dialog: MatDialog) {
  }

  openDialog(illness: IllnessInterface) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      selectedMembers: illness.members,
      title: illness.title
    };

    dialogConfig.width = '60vw';
    dialogConfig.maxWidth = '60vw';

    const dialogRef = this.dialog.open(FamilyMembersComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((results) => {
      console.log(illness);
      illness.members = results;
    });
  }

  ngOnInit() {
  }

  getNeatMembersString(members) {
    return members
      .filter(m => m.isSelected)
      .map(m => m.name)
      .join(', ');
  }



}
