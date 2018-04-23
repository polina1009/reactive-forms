import {PatientInterface} from './form.interface';
import {
  GET_PREFERRED_CONTACT_LIST,
  GET_REFERRAL_SOURCE,
  GET_LANGUAGE,
  GET_WORK_STATUS,
  GET_EMPLOYER,
  GET_RACE,
  GET_ETHNICITY,
  GET_PATIENT
} from './services/api.constants';

export const mock_data = {
  [GET_PREFERRED_CONTACT_LIST]: [
      {id: '1', name: 'Cell Phone'},
      {id: '2', name: 'Home'},
      {id: '3', name: 'Work'}
    ],
  [GET_REFERRAL_SOURCE]: [
    {id: '1', name: 'Internet'},
    {id: '2', name: 'TV'},
    {id: '3', name: 'From friends'}
  ],
  [GET_LANGUAGE]: [
    {id: '1', name: 'English'},
    {id: '2', name: 'Russian'},
    {id: '3', name: 'Ukrainian'}
  ],
  [GET_WORK_STATUS]: [
    {id: '1', name: 'I work'},
    {id: '2', name: 'Jobless'},
    {id: '3', name: 'Student'}
  ],
  [GET_EMPLOYER]: [
    {id: '1', name: 'oooooo'},
    {id: '2', name: 'ppppp'},
    {id: '3', name: 'llllll'}
  ],
  [GET_RACE]: [
    {id: '1', name: 'European'},
    {id: '2', name: 'Negroid'},
    {id: '3', name: 'Mongolian'},
    {id: '4', name: 'Americanoid'},
    {id: '5', name: 'Australo-Weddoid'}
  ],
  [GET_ETHNICITY]: [
    {id: '1', name: 'American'},
    {id: '2', name: 'Russian'},
    {id: '3', name: 'Ukrainian'}
  ],
  [GET_PATIENT]: {
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
      }
};
