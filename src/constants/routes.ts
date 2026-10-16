export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PROPERTIES: '/properties',
  PROPERTY_DETAIL: '/properties/:slug',
  AGENTS: '/agents',
  AGENT_DETAIL: '/agents/:id',
  CONTACT: '/contact',
  SUBMIT_PROPERTY: '/submit-property',
  BLOG: '/blog',
  BLOG_POST: '/blog/:slug',
  FAQ: '/faq',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  FAVORITES: '/favorites',
  DESIGN_SYSTEM: '/design-system',
} as const;

export type RouteKey = keyof typeof ROUTES;
