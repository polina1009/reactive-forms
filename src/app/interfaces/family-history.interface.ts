import {ApiToggleInterface} from './toggle.interface';

export interface FamilyHistoryInterface {
  index?: string;
  id?: string;
  title: string;
  members: ApiToggleInterface[];
}
