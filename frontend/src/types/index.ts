import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type ErrorResponse = {
  message: string;
  description: string;
  instructions: string;
  thanks: string;
};

export interface SocialType {
  name: string;
  icon: IconDefinition;
  handle: string;
}
