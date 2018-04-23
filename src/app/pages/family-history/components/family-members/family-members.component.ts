import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-family-members',
  templateUrl: './family-members.component.html',
  styleUrls: ['./family-members.component.css']
})
export class FamilyMembersComponent implements OnInit {

  description: string;

  constructor(
    public dialogRef: MatDialogRef<FamilyMembersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.description = data.description;
  }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }


  ngOnInit() {
  }

  save() {
    this.dialogRef.close();
  }

}
