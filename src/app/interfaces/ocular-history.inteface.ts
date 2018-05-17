import { ApiToggleInterface } from './toggle.interface';

export interface OcularHistoryInterface {
  id?: string;
  lastVisionExam: string;
  cataracts: ApiToggleInterface;
  contactLenses: ApiToggleInterface;
  crossedEyes: ApiToggleInterface;
  diabeticEyeDisease: ApiToggleInterface;
  diabeticRetinopathy: ApiToggleInterface;
  droopingEyelid: ApiToggleInterface;
  dryEye: ApiToggleInterface;
  eyelidCondition: ApiToggleInterface;
  eyeInfection: ApiToggleInterface;
  eyeInjury: ApiToggleInterface;
  glasses: ApiToggleInterface;
  glaucoma: ApiToggleInterface;
  lazyEye: ApiToggleInterface;
  macularDisease: ApiToggleInterface;
  prominentEyes: ApiToggleInterface;
  redEye: ApiToggleInterface;
  RetinalDisease: ApiToggleInterface;
  otherEyeConditions: string;
}


