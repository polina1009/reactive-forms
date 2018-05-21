import { Pipe, PipeTransform } from '@angular/core';
import {ApiToggleInterface} from '../../interfaces/toggle.interface';




@Pipe({ name: 'selectedMembers' })
export class FamilyHistoryPipe implements PipeTransform {
  transform(members: ApiToggleInterface[]) {
    return members
      .filter(m => m.isSelected)
      .map(m => m.name)
      .join(', ');
  }
}
