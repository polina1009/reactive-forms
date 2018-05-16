export interface OcularHistoryInterface {
  id?: string;
  lastVisionExam: string;
  cataracts: ToggleOcularInterface;
  contactLenses: ToggleOcularInterface;
  crossedEyes: ToggleOcularInterface;
  diabeticEyeDisease: ToggleOcularInterface;
  diabeticRetinopathy: ToggleOcularInterface;
  droopingEyelid: ToggleOcularInterface;
  dryEye: ToggleOcularInterface;
  eyelidCondition: ToggleOcularInterface;
  eyeInfection: ToggleOcularInterface;
  eyeInjury: ToggleOcularInterface;
  glasses: ToggleOcularInterface;
  glaucoma: ToggleOcularInterface;
  lazyEye: ToggleOcularInterface;
  macularDisease: ToggleOcularInterface;
  prominentEyes: ToggleOcularInterface;
  redEye: ToggleOcularInterface;
  RetinalDisease: ToggleOcularInterface;
  otherEyeConditions: string;
}

export interface ToggleOcularInterface {
  id: string;
  name: string;
  isSelected: boolean;
}
