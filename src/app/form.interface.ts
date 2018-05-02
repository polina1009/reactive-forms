export interface ApiSelectInterface {
  name: string;
  id: string;
}

export interface ApiPatientInterface {
  id: string;
  patientInfo: PatientInterface;
}

export interface SelectOptionInterface {
  value: string;
  viewValue: string;
}

export interface PatientInterface {
  title: string;
  firstName: string;
  lastName: string;
  cellPhone: string;
  home: string;
  work: string;
  email: string;
  preferredContact: string;
  address1: string;
  address2: string;
  zip: string;
  city: string;
  state: string;
  dateOfBirth: string;
  ssn: string;
  referralSource: string;
  language: string;
  workStatus: string;
  employer: string;
  race: string;
  ethnicity: string;
  gender: string;
}

export interface UserInterface {
  email: string;
  password: string;
}
