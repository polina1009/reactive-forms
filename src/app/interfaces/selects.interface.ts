export interface SelectArrInterface {
  preferredContact: ApiSelectInterface[];
  referralSource: ApiSelectInterface[];
  language: ApiSelectInterface[];
  workStatus: ApiSelectInterface[];
  employer: ApiSelectInterface[];
  race: ApiSelectInterface[];
  ethnicity: ApiSelectInterface[];
}

export interface ApiSelectInterface {
  id: string;
  name: string;
}

export interface SelectOptionInterface {
  value: string;
  viewValue: string;
}
