import { ApiToggleInterface } from './toggle.interface';

export interface MedicationsInterface {
  id?: string;
  comments: string;
  takeAnyMedications: ApiToggleInterface;
  medications: MedArrInterface[];
}

export interface MedArrInterface {
  name: string;
  current: boolean;
  startDate: string;
  stopDate: string;
}
