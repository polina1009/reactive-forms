import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import {FamilyMembersComponent} from './components';
import {IllnessInterface, MemberInterface} from './family-history.interface';
import { illnessList} from './family-history-data';
import {NavigationService} from '../../services/navigation.service';


@Component({
  selector: 'app-family-history',
  templateUrl: './family-history.component.html',
  styleUrls: ['./family-history.component.scss']
})
export class FamilyHistoryComponent implements OnInit {

  public illnessList: IllnessInterface[] = illnessList;

  constructor(
    public dialog: MatDialog,
    private navService: NavigationService,
    public snackBar: MatSnackBar
  ) {
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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

  ngOnInit() {
    this.navService.nextPageClick.subscribe((eventData) => {
      const { currentUrl, nextUrl } = eventData;
      if (!(currentUrl.match(/family-history/))) {
        return;
      }
      setTimeout(() => {
        const formData = this.illnessList;
        if (this.validate(formData)) {
          console.log(formData, '***********');
          this.navService.goTo(nextUrl);
        } else {
          this.openSnackBar('Form is not full!', 'Сontinue filling');
        }
        console.log('emmit end');
      }, 1000);
    });
    // this.navService.nextPageClick.subscribe(() => {
    //   const formData = this.illnessList;
    //   console.log(formData, '***********');
    // });
  }

  private validate(formData) {
    return true;
    // return Math.random() > 0.5;
  }

}
