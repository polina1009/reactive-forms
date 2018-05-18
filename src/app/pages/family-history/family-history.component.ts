import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {FamilyMembersComponent} from './components';
import {IllnessInterface, MemberInterface} from './family-history.interface';
import { illnessList} from './family-history-data';
import {NavigationService} from '../../services/navigation.service';
import {Subscription} from 'rxjs/Subscription';
import {FamilyHistoryInterface} from '../../interfaces/family-history.interface';


@Component({
  selector: 'app-family-history',
  templateUrl: './family-history.component.html',
  styleUrls: ['./family-history.component.scss']
})
export class FamilyHistoryComponent implements OnInit, OnDestroy {

  public illnessList: FamilyHistoryInterface[];
  private navNextSubscribe: Subscription;

  constructor(
    public dialog: MatDialog,
    private navService: NavigationService
  ) {
    this.illnessList = [];
  }

  getPreparedDialogConfig (illness: FamilyHistoryInterface) {
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

  openDialog(illness: FamilyHistoryInterface) {
    const dialogRef = this.dialog.open(FamilyMembersComponent, this.getPreparedDialogConfig(illness));

    dialogRef.afterClosed().subscribe((results: MemberInterface[]) => {
      illness.members = results;
      this.illnessList = JSON.parse(JSON.stringify(this.illnessList));
    });
  }

  ngOnInit() {
    this.navNextSubscribe = this.navService.navButtonClick.subscribe((eventData) => {
      const { navUrl, currentUrl } = eventData;
      if (!(currentUrl.match(/family-history/))) {
        return;
      }
      this.navService.preparationAndDisplayFormData(navUrl, this.illnessList);
    });
  }

  ngOnDestroy() {
    this.navNextSubscribe.unsubscribe();
  }
}
