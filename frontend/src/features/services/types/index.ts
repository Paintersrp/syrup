import { SectionHeaderContent } from '@/components/Built';
import { FullTable } from '@/components/Built/DisplayTable/DisplayTable';
import { ContactInformationContent } from '@/features/contact';
import { SocialContent } from '@/types';

export type BenefitType = {
  id: number;
  icon: string;
  title: string;
  description: string;
  buttonText?: string;
  page_link?: string;
};

export type ContentTextType = {
  slug: string;
  title: string;
  description: string;
};

export type QuizType = {
  id: number;
  title: string;
  slug: string;
  description: string;
  question_sets: QuestionSet[];
};

export type QuestionSet = {
  id: number;
  title: string;
  order: number;
  description: string;
  questions: Question[];
  questionnaire: number;
};

export type Question = {
  id: number;
  text: string;
  answer_choices: AnswerChoice[];
  question_set: number;
  order: number;
  slug: string;
};

export type AnswerChoice = {
  id: number;
  text: string;
  value: string;
  order: number;
  question: number;
};

export type ServiceFeature = {
  id: number;
  detail: string;
};

export type ServiceType = {
  id: number;
  service_title: string;
  price: string;
  features: ServiceFeature[];
  image: string;
  paragraph_one?: string;
  paragraph_two?: string;
  paragraph_three?: string;
};

export type ServiceContent = {
  services: ServiceType[];
  servicesTable: [FullTable];
  competitorsTable: [FullTable];
  quizData: [QuizType];
  processText: string;
  processImage: any;
  benefits: BenefitType[];
  benefitsHeader: [SectionHeaderContent];
  contentText: [ContentTextType];
  contactInfo: ContactInformationContent;
  socials: SocialContent[];
};

export type ServiceResponse = {
  data: ServiceContent;
};
