export interface SiteLinkType {
  to: string;
  key: string;
  footer: boolean;
  navbar: boolean;
}

export const LINKS: SiteLinkType[] = [
  {
    to: '/',
    key: 'Home',
    footer: false,
    navbar: true,
  },
  {
    to: '/about',
    key: 'About',
    footer: true,
    navbar: true,
  },
  {
    to: '/contact',
    key: 'Contact',
    footer: true,
    navbar: true,
  },
  {
    to: '/services',
    key: 'Services',
    footer: true,
    navbar: true,
  },
  {
    to: '/posts',
    key: 'Posts',
    footer: true,
    navbar: true,
  },

  {
    to: '/WIP',
    key: 'WIP',
    footer: true,
    navbar: true,
  },
];
