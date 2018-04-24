import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import {FamilyMembersComponent} from './components';

@Component({
  selector: 'app-family-history',
  templateUrl: './family-history.component.html',
  styleUrls: ['./family-history.component.css']
})
export class FamilyHistoryComponent implements OnInit {

  value = '';

  constructor(public dialog: MatDialog) { }

  openDialog(value: string) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      value
    };

    dialogConfig.maxHeight = '100vh';
    dialogConfig.height = '100vh';
    dialogConfig.width = '100vw';
    dialogConfig.maxWidth = '100vw';

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