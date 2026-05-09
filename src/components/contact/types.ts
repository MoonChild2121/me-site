export type ContactChannel = 'email' | 'linkedin' | 'github';

export type ContactLink = {
  label: string;
  value: string;
  href: string;
  description: string;
  icon: ContactChannel;
};
