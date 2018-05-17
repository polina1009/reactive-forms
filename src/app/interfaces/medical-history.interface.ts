import {ApiToggleInterface} from './toggle.interface';

export interface MedicalHistoryInterface {
  id?: string;
  surgeries: SurgeriesInterface[];
  injuries: InjuriesInterface[];
  lastMedicalExam: string;
  allergies: ApiToggleInterface;
  arthritis: ApiToggleInterface;
  autoimmuneDisease: ApiToggleInterface;
  cancer: ApiToggleInterface;
  diabetes: ApiToggleInterface;
  headaches: ApiToggleInterface;
  hepatitis: ApiToggleInterface;
  highCholesterol: ApiToggleInterface;
  heartDisease: ApiToggleInterface;
  highBloodPressure: ApiToggleInterface;
  hiv: ApiToggleInterface;
  patientIsPregnant: ApiToggleInterface;
  patientIsBreastfeeding: ApiToggleInterface;
  thyroidDisease: ApiToggleInterface;
  std: ApiToggleInterface;
  otherMedicalConditions: string;
}

export interface SurgeriesInterface {
  surgeriesType: string;
  dateOfSurgery: string;
}

export interface InjuriesInterface {
  injuryType: string;
  dateOfInjury: string;
}
