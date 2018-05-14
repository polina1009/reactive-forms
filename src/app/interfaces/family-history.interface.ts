export interface FamilyHistoryInterface {
  title: string;
  members: MemberInterface[];
}

export interface MemberInterface {
  id: string;
  name: string;
  isSelected: boolean;
}
