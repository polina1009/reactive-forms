
export const allMembers = [
  {
    id: 'mother',
    name: 'Mother',
    isSelected: false
  },
  {
    id: 'father',
    name: 'Father',
    isSelected: true
  },
  {
    id: 'sister',
    name: 'Sister',
    isSelected: false
  },
  {
    id: 'brother',
    name: 'Brother',
    isSelected: false
  },
  {
    id: 'child',
    name: 'Child',
    isSelected: false
  },
  {
    id: 'grandmother',
    name: 'Grandmother',
    isSelected: true
  },
  {
    id: 'grandfather',
    name: 'Grandfather',
    isSelected: false
  },
  {
    id: 'uncle',
    name: 'Uncle',
    isSelected: false
  },
  {
    id: 'aunt',
    name: 'Aunt',
    isSelected: true
  }
];

function fillAllMembers() {
  const allMembersRand = allMembers.map(member => {
    member.isSelected = Math.random() > 0.5 ? true : false;
    return JSON.parse(JSON.stringify(member));
  });
  return allMembersRand;
}

export const illnessList = [
  {
    title: 'Arthritis',
    members: fillAllMembers()
  },
  {
    title: 'Blindness',
    members: fillAllMembers()
  },
  {
    title: 'Cancer',
    members: fillAllMembers()
  },
  {
    title: 'Corneal Disease',
    members: fillAllMembers()
  },
  {
    title: 'Crossed Eyes',
    members: fillAllMembers()
  },
  {
    title: 'Diabetes',
    members: fillAllMembers()
  },
  {
    title: 'Glaucoma',
    members: fillAllMembers()
  },
  {
    title: 'Heart Disease',
    members: fillAllMembers()
  },
  {
    title: 'High Cholesterol',
    members: fillAllMembers()
  },
  {
    title: 'Kidney Disease',
    members: fillAllMembers()
  },
  {
    title: 'Lazy Eye',
    members: fillAllMembers()
  },
  {
    title: 'Lupus',
    members: fillAllMembers()
  },
  {
    title: 'Macular Degeneration',
    members: fillAllMembers()
  },
  {
    title: 'Retinal Disease',
    members: fillAllMembers()
  },
  {
    title: 'Thuroid Disease',
    members: fillAllMembers()
  }
];
