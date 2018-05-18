import {ApiToggleInterface} from './toggle.interface';

export interface FamilyHistoryInterface {
  id?: string;
  title: string;
  members: ApiToggleInterface[];
}
