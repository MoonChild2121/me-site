import type { ContactLink } from './types';

export const CONTACT_LINKS: ContactLink[] = [
  {
    label: 'Email',
    value: 'zeny@email.com',
    href: 'mailto:zeny@email.com',
    description: 'for serious things',
    icon: 'email',
  },
  {
    label: 'LinkedIn',
    value: '/in/zainab-kashif',
    href: 'https://linkedin.com/in/zainab-kashif-193b26218',
    description: 'work stuff, occasional post',
    icon: 'linkedin',
  },
  {
    label: 'GitHub',
    value: 'github.com/MoonChild2121',
    href: 'https://github.com/MoonChild2121',
    description: 'where the actual work lives',
    icon: 'github',
  },
];
