import {PatientInterface} from './form.interface';

export const preferredContact = [
  {id: '1', name: 'Cell Phone'},
  {id: '2', name: 'Home'},
  {id: '3', name: 'Work'}
];

export const referralSource = [
  {id: '1', name: 'Internet'},
  {id: '2', name: 'TV'},
  {id: '3', name: 'From friends'}
];

export const language = [
  {id: '1', name: 'English'},
  {id: '2', name: 'Russian'},
  {id: '3', name: 'Ukrainian'}
];

export const workStatus = [
  {id: '1', name: 'I work'},
  {id: '2', name: 'Jobless'},
  {id: '3', name: 'Student'}
];

export const race = [
  {id: '1', name: 'European'},
  {id: '2', name: 'Negroid'},
  {id: '3', name: 'Mongolian'},
  {id: '4', name: 'Americanoid'},
  {id: '5', name: 'Australo-Weddoid'}
];

export const ethnicity = [
  {id: '1', name: 'American'},
  {id: '2', name: 'Russian'},
  {id: '3', name: 'Ukrainian'}
];


export const patient: PatientInterface = {
  // id: '1',
  title: 'ppp',
  firstName: 'Alex',
  lastName: 'Bro',
  cellPhone: '0000000000',
  home: '',
  work: '',
  email: 'ooo@gg.com',
  preferredContact: '2',
  address1: '',
  address2: '',
  zip: '000',
  city: 'pohcfihv',
  state: 'jhvif',
  dateOfBirth: '11111111',
  ssn: 'kkk',
  referralSource: '2',
  language: '1',
  workStatus: '1',
  employer: '',
  race: '1',
  ethnicity: '2',
  gender: '',
};
