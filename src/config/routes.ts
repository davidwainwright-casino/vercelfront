const routes = {
  home: '/',
  authors: '/providers',
  explore: '/explore',
  about: '/about-us',
  contact: '/contact-us',
  profile: '/profile',
  checkout: '/checkout',
  help: '/help',
  licensing: '/licensing',
  refund: '/refund',
  terms: '/terms',
  privacy: '/privacy',
  password: '/password',
  orderUrl: (tracking_number: string) => `/orders/${tracking_number}`,
  productUrl: (slug: string) => `https://09-09-nsb.mooo.com/api/play/${slug}`,
  tagUrl: (slug: string) => `/products/tags/${slug}`,
  shopUrl: (slug: string) => `/providers/${slug}`,
};
export default routes;
