import { Component, OnInit } from '@angular/core';
import { toggleIllnessList } from './medical-history-data';
import { ToggleIllnessInterface } from './medical-history.interface';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.scss']
})
export class MedicalHistoryComponent implements OnInit {
  public toggleList: ToggleIllnessInterface[];


  constructor() {
    this.toggleList = toggleIllnessList;
  }

  ngOnInit() {
  }

}
