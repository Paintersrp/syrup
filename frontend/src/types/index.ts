import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type ErrorResponse = {
  message: string;
  description: string;
  instructions: string;
  thanks: string;
};

export type SetErrorFn = (error: ErrorResponse | unknown) => void;

export interface SocialContent {
  name: string;
  icon: IconDefinition;
  handle: string;
}
