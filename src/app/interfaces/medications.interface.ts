export interface MedicationsInterface {
  comments: string;
  takeAnyMedications: MedicationsToggleInterface;
  medications: MedArrInterface[];
}

export interface MedArrInterface {
  name: string;
  current: boolean;
  startDate: string;
  stopDate: string;
}

export interface MedicationsToggleInterface {
  id: string;
  name: string;
  isSelected: boolean;
}
