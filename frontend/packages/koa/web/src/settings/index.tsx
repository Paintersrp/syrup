import React from 'react';
import {
  faFacebookSquare,
  faTwitter,
  faInstagram,
  faLinkedin,
  faYoutube,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

import { SocialContent } from '@/types';
import { Icon } from 'sy-core';

export const SOCIALS: SocialContent[] = [
  { name: 'facebook', icon: faFacebookSquare, handle: 'Syrup' },
  { name: 'twitter', icon: faTwitter, handle: 'Syrup' },
  { name: 'instagram', icon: faInstagram, handle: 'Syrup' },
  { name: 'linkedin', icon: faLinkedin, handle: 'Syrup' },
  { name: 'youtube', icon: faYoutube, handle: 'Syrup' },
  { name: 'github', icon: faGithub, handle: 'Syrup' },
];

export const TITLE: string = 'SYRUP';

export const LOGO: React.ReactNode = <Icon icon="cake" color="secondary" size="21px" />;
