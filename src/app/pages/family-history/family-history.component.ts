import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {FamilyMembersComponent} from './components';
import {NavigationService} from '../../services/navigation.service';
import {Subscription} from 'rxjs/Subscription';
import {FamilyHistoryInterface} from '../../interfaces/family-history.interface';
import {ApiToggleInterface} from '../../interfaces/toggle.interface';
import {PatientService} from '../../services/patient.service';
import { GET_FAMILY_HISTORY } from '../../services/api.constants';


@Component({
  selector: 'app-family-history',
  templateUrl: './family-history.component.html',
  styleUrls: ['./family-history.component.scss']
})
export class FamilyHistoryComponent implements OnInit, OnDestroy {

  public illnessList: FamilyHistoryInterface[];
  private navNextSubscribe: Subscription;
  private  illnessObj;

  constructor(
    public dialog: MatDialog,
    private navService: NavigationService,
    private patientService: PatientService
  ) {}

  // getPageData() {
  //   this.patientService.getFamilyHistory(GET_FAMILY_HISTORY).subscribe(pageData => {
  //     this.illnessList = pageData;
  //   });
  // }
  getPageData() {
    this.patientService.getFamilyHistory('fam222').subscribe(pageData => {
      console.log(pageData);
      pageData.map(p => {
        this.illnessObj = p;
        console.log(p);
        this.illnessList = p.fam;
      });
    });
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

  updateData() {
    this.patientService.updateFamilyHistory(this.illnessObj, 'fam222');
  }

  openDialog(illness: FamilyHistoryInterface) {
    const dialogRef = this.dialog.open(FamilyMembersComponent, this.getPreparedDialogConfig(illness));
    console.log(illness);

    dialogRef.afterClosed().subscribe((results: ApiToggleInterface[]) => {
      illness.members = results;
      this.updateData();
      console.log(this.illnessList);
      // this.illnessList = JSON.parse(JSON.stringify(this.illnessList));
      // this.patientService.updateFamilyHistory(illness, GET_FAMILY_HISTORY);
    });
  }

  ngOnInit() {
    this.getPageData();
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
