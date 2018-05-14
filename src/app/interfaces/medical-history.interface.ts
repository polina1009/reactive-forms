export interface MedicalHistoryInterface {
  surgeries: SurgeriesInterface[];
  injuries: InjuriesInterface[];
  lastMedicalExam: string;
  allergies: ToggleIllnessInterface;
  arthritis: ToggleIllnessInterface;
  autoimmuneDisease: ToggleIllnessInterface;
  cancer: ToggleIllnessInterface;
  diabetes: ToggleIllnessInterface;
  headaches: ToggleIllnessInterface;
  hepatitis: ToggleIllnessInterface;
  highCholesterol: ToggleIllnessInterface;
  heartDisease: ToggleIllnessInterface;
  highBloodPressure: ToggleIllnessInterface;
  hiv: ToggleIllnessInterface;
  patientIsPregnant: ToggleIllnessInterface;
  patientIsBreastfeeding: ToggleIllnessInterface;
  thyroidDisease: ToggleIllnessInterface;
  std: ToggleIllnessInterface;
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

export interface ToggleIllnessInterface {
  id: string;
  name: string;
  isSelected: boolean;
}
