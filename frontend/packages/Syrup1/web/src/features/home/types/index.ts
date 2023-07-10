import { SocialContent } from '@/types';

export type HeroContent = {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
};
export type ProcessContent = {
  id: number;
  icon: string;
  title: string;
  description: string;
};

export type HomeContent = {
  hero: HeroContent;
  processes: ProcessContent[];
  socials: SocialContent[];
};
