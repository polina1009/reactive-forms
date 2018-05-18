export interface MedicationsInterface {
  id?: string;
  comments: string;
  takeAnyMedications: boolean;
  medications: MedArrInterface[];
}

export interface MedArrInterface {
  name: string;
  current: boolean;
  startDate: string;
  stopDate: string;
}
