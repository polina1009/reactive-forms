import { Component, OnInit, OnDestroy } from '@angular/core';
import {ToggleOcularInterface} from './ocular-history.interface';
import { toggleOcularList } from './ocular-input-data';

import { FormBuilder, FormGroup } from '@angular/forms';
import {NavigationService} from '../../services/navigation.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-ocular-history',
  templateUrl: './ocular-history.component.html',
  styleUrls: ['./ocular-history.component.scss']
})
export class OcularHistoryComponent implements OnInit, OnDestroy {

  ocularHistoryForms: FormGroup;

  public toggleOcularList: ToggleOcularInterface[];

  public maskDate = {
    guide: true,
    showMask : false,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  };

  private navNextSubscribe: Subscription;
  private navPrevSubscribe: Subscription;

  constructor(
    private fb: FormBuilder,
    private navService: NavigationService
  ) {
    this.toggleOcularList = toggleOcularList;
    this.createForm();
  }

  createForm() {
    this.ocularHistoryForms = this.fb.group({
      lastVisionExam: this.fb.control(''),
      cataracts: this.fb.control(''),
      contactLenses: this.fb.control(''),
      cornealDisease: this.fb.control(''),
      crossedEyes: this.fb.control(''),
      diabeticEyeDisease: this.fb.control(''),
      diabeticRetinopathy: this.fb.control(''),
      droopingEyelid: this.fb.control(''),
      dryEye: this.fb.control(''),
      eyelidCondition: this.fb.control(''),
      eyeInfection: this.fb.control(''),
      eyeInjury: this.fb.control(''),
      glasses: this.fb.control(''),
      glaucoma: this.fb.control(''),
      lazyEye: this.fb.control(''),
      macularDisease: this.fb.control(''),
      prominentEyes: this.fb.control(''),
      redEye: this.fb.control(''),
      retinalDisease: this.fb.control(''),
      otherEyeConditions: this.fb.control('')
    });
  }

  ngOnInit() {
    this.navNextSubscribe = this.navService.nextPageClick.subscribe((eventData) => {
      const { currentUrl, nextUrl } = eventData;
      if (!(currentUrl.match(/ocular-history/))) {
        return;
      }
      this.navService.preparationAndDisplayFormData(nextUrl, this.ocularHistoryForms.value);
    });

    this.navPrevSubscribe = this.navService.prevPageClick.subscribe((eventData) => {
      const { prevUrl, currentUrl } = eventData;
      if (!(currentUrl.match(/ocular-history/))) {
        return;
      }
      this.navService.preparationAndDisplayFormData(prevUrl, this.ocularHistoryForms.value);
    });
  }

  ngOnDestroy () {
    this.navNextSubscribe.unsubscribe();
    this.navPrevSubscribe.unsubscribe();
  }

}
