import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookSquare,
  faTwitter,
  faInstagram,
  faLinkedin,
  faYoutube,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

import { SocialContent } from '@/types';
import { colors } from '@/theme/common';

export const SOCIALS: SocialContent[] = [
  { name: 'facebook', icon: faFacebookSquare, handle: 'Test' },
  { name: 'twitter', icon: faTwitter, handle: 'Test' },
  { name: 'instagram', icon: faInstagram, handle: 'Test' },
  { name: 'linkedin', icon: faLinkedin, handle: 'Test' },
  { name: 'youtube', icon: faYoutube, handle: 'Test' },
  { name: 'github', icon: faGithub, handle: 'Test' },
];

export const TITLE: string = 'DEBLUR';

export const LOGO: React.ReactNode = (
  <FontAwesomeIcon icon={faCoins} style={{ fontSize: '1.5rem', color: colors.secondary }} />
);
