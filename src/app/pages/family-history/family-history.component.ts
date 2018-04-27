import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import {FamilyMembersComponent} from './components';
import {IllnessInterface, MemberInterface} from './family-history.interface';
import { illnessList} from './family-history-data';


@Component({
  selector: 'app-family-history',
  templateUrl: './family-history.component.html',
  styleUrls: ['./family-history.component.scss']
})
export class FamilyHistoryComponent implements OnInit {

  public illnessList: IllnessInterface[] = illnessList;

  constructor(public dialog: MatDialog) {
  }

  getPripearedDialogConfig (illness: IllnessInterface) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      selectedMembers: illness.members,
      title: illness.title
    };

    dialogConfig.width = '50vw';
    dialogConfig.maxWidth = '50vw';

    return dialogConfig;
  }

  openDialog(illness: IllnessInterface) {
    const dialogRef = this.dialog.open(FamilyMembersComponent, this.getPripearedDialogConfig(illness));

    dialogRef.afterClosed().subscribe((results: MemberInterface[]) => {
      illness.members = results;
      this.illnessList = JSON.parse(JSON.stringify(this.illnessList));
    });
  }

  ngOnInit() {
  }

  // getNeatMembersString(members) {
  //   return members
  //       .filter(m => m.isSelected)
  //       .map(m => m.name)
  //       .join(', ');
  // }



}
