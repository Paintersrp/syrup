import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookSquare,
  faTwitter,
  faInstagram,
  faLinkedin,
  faYoutube,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

export interface Social {
  name: string;
  icon: IconDefinition;
  handle: string;
}

export const SOCIALS: Social[] = [
  { name: "facebook", icon: faFacebookSquare, handle: "Test" },
  { name: "twitter", icon: faTwitter, handle: "Test" },
  { name: "instagram", icon: faInstagram, handle: "Test" },
  { name: "linkedin", icon: faLinkedin, handle: "Test" },
  { name: "youtube", icon: faYoutube, handle: "Test" },
  { name: "github", icon: faGithub, handle: "Test" },
];
