export interface MemberInterface {
  id: string;
  title: string;
  isSelected: boolean;
}

export interface IllnessInterface {
  title: string;
  members: MemberInterface;
}
