export interface SelectArrInterface {
  id?: string;
  selectName: OptionInterface[];
  // referralSource: SelectOptionInterface[];
  // language: SelectOptionInterface[];
  // workStatus: SelectOptionInterface[];
  // employer: SelectOptionInterface[];
  // race: SelectOptionInterface[];
  // ethnicity: SelectOptionInterface[];
}

export interface OptionInterface {
  id: string;
  name: string;
}

export interface SelectOptionInterface2 {
  value: string;
  viewValue: string;
}
