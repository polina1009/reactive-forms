import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import {FamilyMembersComponent} from './components';
import {IllnessInterface, MemberInterface} from './family-history.interface';
import { illnessList} from './family-history-data';
import {NavigationService} from '../../services/navigation.service';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-family-history',
  templateUrl: './family-history.component.html',
  styleUrls: ['./family-history.component.scss']
})
export class FamilyHistoryComponent implements OnInit, OnDestroy {

  public illnessList: IllnessInterface[] = illnessList;
  private navNextSubscribe: Subscription;
  private navPrevSubscribe: Subscription;

  constructor(
    public dialog: MatDialog,
    private navService: NavigationService
  ) {
  }

  getPreparedDialogConfig (illness: IllnessInterface) {
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
    const dialogRef = this.dialog.open(FamilyMembersComponent, this.getPreparedDialogConfig(illness));

    dialogRef.afterClosed().subscribe((results: MemberInterface[]) => {
      illness.members = results;
      this.illnessList = JSON.parse(JSON.stringify(this.illnessList));
    });
  }

  ngOnInit() {
    this.navNextSubscribe = this.navService.nextPageClick.subscribe((eventData) => {
      const { currentUrl, nextUrl } = eventData;
      if (!(currentUrl.match(/family-history/))) {
        return;
      }
      this.navService.preparationAndDisplayFormData(nextUrl, this.illnessList);
    });

    this.navPrevSubscribe = this.navService.prevPageClick.subscribe((eventData) => {
      const { prevUrl, currentUrl } = eventData;
      if (!(currentUrl.match(/family-history/))) {
        return;
      }
      this.navService.preparationAndDisplayFormData(prevUrl, this.illnessList);
    });
  }

  ngOnDestroy() {
    this.navNextSubscribe.unsubscribe();
    this.navPrevSubscribe.unsubscribe();
  }
}
