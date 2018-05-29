export const nextUrl = {
  '/': '/medical-history',
  '/medical-history': '/ocular-history',
  '/ocular-history': '/medications',
  '/medications': '/family-history'
};

export const prevUrl = {
  '/family-history': '/medications',
  '/medications': '/ocular-history',
  '/ocular-history': '/medical-history',
  '/medical-history': '/'
};
