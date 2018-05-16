import { Component, OnInit, OnDestroy } from '@angular/core';
import {ToggleOcularInterface} from './ocular-history.interface';
import { toggleOcularList } from './ocular-input-data';

import { FormBuilder, FormGroup } from '@angular/forms';
import {NavigationService} from '../../services/navigation.service';
import {Subscription} from 'rxjs/Subscription';
import {PatientService} from '../../services/patient.service';
import { GET_OCULAR_HISTORY } from '../../services/api.constants';
import {OcularHistoryInterface} from '../../interfaces/ocular-history.inteface';

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
  public pageData: OcularHistoryInterface[];

  constructor(
    private fb: FormBuilder,
    private navService: NavigationService,
    private patientService: PatientService
  ) {
    this.toggleOcularList = toggleOcularList;
    this.createForm();
  }

  get controls() {
    return this.ocularHistoryForms.controls;
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

  setFormData(pageData) {
    this.controls.lastVisionExam.setValue(pageData.lastVisionExam);
    this.controls.cataracts.setValue(pageData.cataracts);
    this.controls.contactLenses.setValue(pageData.contactLenses);
    this.controls.cornealDisease.setValue(pageData.cornealDisease);
    this.controls.crossedEyes.setValue(pageData.crossedEyes);
    this.controls.diabeticEyeDisease.setValue(pageData.diabeticEyeDisease);
    this.controls.diabeticRetinopathy.setValue(pageData.diabeticRetinopathy);
    this.controls.droopingEyelid.setValue(pageData.droopingEyelid);
    this.controls.dryEye.setValue(pageData.dryEye);
    this.controls.eyelidCondition.setValue(pageData.eyelidCondition);
    this.controls.eyeInfection.setValue(pageData.eyeInfection);
    this.controls.eyeInjury.setValue(pageData.eyeInjury);
    this.controls.glasses.setValue(pageData.glasses);
    this.controls.glaucoma.setValue(pageData.glaucoma);
    this.controls.lazyEye.setValue(pageData.lazyEye);
    this.controls.macularDisease.setValue(pageData.macularDisease);
    this.controls.prominentEyes.setValue(pageData.prominentEyes);
    this.controls.redEye.setValue(pageData.redEye);
    this.controls.retinalDisease.setValue(pageData.retinalDisease);
    this.controls.otherEyeConditions.setValue(pageData.otherEyeConditions);
  }

  getOcularHistoryData() {
    this.patientService.getOcularHistory(GET_OCULAR_HISTORY).subscribe((page) => {
      this.pageData = page;
      this.pageData.map(p => {
        this.setFormData(p);
      });
    });
  }

  ngOnInit() {
    this.getOcularHistoryData();
    this.navNextSubscribe = this.navService.navButtonClick.subscribe((eventData) => {
      const { navUrl, currentUrl } = eventData;
      if (!(currentUrl.match(/ocular-history/))) {
        return;
      }
      this.patientService.updateOcularHistory(this.ocularHistoryForms.value, GET_OCULAR_HISTORY)
      this.navService.preparationAndDisplayFormData(navUrl, this.ocularHistoryForms.value);
    });
  }

  ngOnDestroy () {
    this.navNextSubscribe.unsubscribe();
  }

}
