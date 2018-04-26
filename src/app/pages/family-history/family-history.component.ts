import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import {FamilyMembersComponent} from './components';
import { IllnessInterface } from './family-history.interface';
import { illnessList} from './family-hystory-data'; // TODO file name with error


@Component({
  selector: 'app-family-history',
  templateUrl: './family-history.component.html',
  styleUrls: ['./family-history.component.scss']
})
export class FamilyHistoryComponent implements OnInit {

  public illnessList = illnessList; // TODO Set interface and data set put to ngOnInit

  constructor(public dialog: MatDialog) {
  }

  openDialog(illness: IllnessInterface) {

    const dialogConfig = new MatDialogConfig(); // TODO put preparing config to separate method

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

  getNeatMembersString(members) { // TODO Remake to pipe
    return members
      .filter(m => m.isSelected)
      .map(m => m.name)
      .join(', ');
  }



}
