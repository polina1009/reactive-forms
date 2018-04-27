import { Pipe, PipeTransform } from '@angular/core';
import { MemberInterface } from './family-history.interface';




@Pipe({ name: 'selectedMembers' })
export class FamilyHistoryPipe implements PipeTransform {
  transform(members: MemberInterface[]) {
    return members
      .filter(m => m.isSelected)
      .map(m => m.name)
      .join(', ');
  }
}
