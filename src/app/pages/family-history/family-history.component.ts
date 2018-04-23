import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import {FamilyMembersComponent} from './components';

@Component({
  selector: 'app-family-history',
  templateUrl: './family-history.component.html',
  styleUrls: ['./family-history.component.css']
})
export class FamilyHistoryComponent implements OnInit {

  // animal: string;
  // name: string;

  constructor(public dialog: MatDialog) { }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
    };

    dialogConfig.position = {
      top: '0',
      bottom: '0'
    };

    dialogConfig.maxHeight = '100vh';
    dialogConfig.maxWidth = '100vw';

    this.dialog.open(FamilyMembersComponent, dialogConfig);

    const dialogRef = this.dialog.open(FamilyMembersComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => console.log('Dialog output:', data)
    );
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(FamilyMembersComponent, {
  //     width: '250px',
  //     data: { name: this.name, animal: this.animal }
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.animal = result;
  //   });
  // }

  ngOnInit() {
  }

}
