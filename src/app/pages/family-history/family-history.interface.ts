export interface MemberInterface {
  id: string;
  name: string;
  isSelected: boolean;
}

export interface IllnessInterface {
  title: string;
  members: MemberInterface[];
}
