export const maskPhone = {
  guide: true,
  showMask: false,
  mask: ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
};

export const maskDate = {
  guide: true,
  showMask : false,
  mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
};
