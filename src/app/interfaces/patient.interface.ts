import { DemographicsInterface } from './demographics.interface';
import { MedicalHistoryInterface } from './medical-history.interface';
import { OcularHistoryInterface } from './ocular-history.inteface';
import { MedicationsInterface } from './medications.interface';
import { FamilyHistoryInterface } from './family-history.interface';


export interface PatientsInterface {
  demographics: DemographicsInterface[];
  // medicalHistory: MedicalHistoryInterface[];
  // ocularHistory: OcularHistoryInterface[];
  // medications: MedicationsInterface[];
  // familyHistory: FamilyHistoryInterface;
}
