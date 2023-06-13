import { JobContent } from '@/features/jobs';
import { SocialContent } from '@/types';

export interface ContactInformationContent {
  email: string;
  phone: string;
  address: string;
}

export type HoursContent = {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
};

export interface MemberContent {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  [key: string]: string;
}

export type ContactContent = {
  contactInfo: ContactInformationContent;
  hours: HoursContent;
  jobs: JobContent[];
  members: MemberContent[];
  socials: SocialContent[];
};

export type ContactResponse = {
  data: ContactContent;
};
