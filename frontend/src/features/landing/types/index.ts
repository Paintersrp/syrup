import { SectionHeaderContent } from '@/components/Built';
import { ContactInformationContent } from '@/features/contact';
import { PostContent } from '@/features/posts';

import { SocialContent } from '@/types';

export type HeroContent = {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
};
export type ProcessContent = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

export type LandingContent = {
  contactInfo: ContactInformationContent;
  hero: HeroContent;
  posts: PostContent[];
  postsHeader: SectionHeaderContent;
  processes: ProcessContent[];
  processHeader: SectionHeaderContent;
  socials: SocialContent[];
  services: any;
};

export type LandingResponse = {
  data: LandingContent;
};
