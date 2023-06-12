import { JobType } from '@/features/jobs/routes/Jobs';
import { SocialType } from '@/types';

export interface ContactInformationType {
  email: string;
  phone: string;
  address: string;
}

export type HoursType = {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
};

export interface MemberType {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  [key: string]: string;
}

export type ContactData = {
  contactInfo: ContactInformationType;
  hours: HoursType;
  jobs: JobType[];
  members: MemberType[];
  socials: SocialType[];
};
