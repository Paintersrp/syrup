import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookSquare,
  faTwitter,
  faInstagram,
  faLinkedin,
  faYoutube,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

import BaseIconButton from "./framework/Base/BaseIconButton/BaseIconButton";
import WIPPage from "./components/WIP/WIPPage";
import TrackerPage from "./components/Tracker/TrackerPage";

import { palettes } from "./theme";

export const LINKS = [
  { to: "/", text: "Home", footer: true, navbar: true, page: <TrackerPage /> },
  {
    to: "/about",
    text: "About",
    footer: true,
    navbar: true,
    page: <TrackerPage />,
  },
  { to: "/WIP", text: "WIP", footer: true, navbar: true, page: <WIPPage /> },
];

export const TITLE = "DEBLUR";
export const LOGO = (
  <FontAwesomeIcon icon={faCoins} style={{ fontSize: "1.5rem" }} />
);

export const SOCIALS = [
  {
    name: "facebook",
    icon: (
      <BaseIconButton
        size="md"
        fontSize="1.5rem"
        icon={faFacebookSquare}
        invertColors
        manualHoverColor={palettes.secondary.light}
      />
    ),
    handle: "Test",
  },
  {
    name: "twitter",
    icon: (
      <BaseIconButton
        size="md"
        fontSize="1.5rem"
        icon={faTwitter}
        invertColors
        manualHoverColor={palettes.secondary.light}
      />
    ),
    handle: "Test",
  },
  {
    name: "instagram",
    icon: (
      <BaseIconButton
        size="md"
        fontSize="1.5rem"
        icon={faInstagram}
        invertColors
        manualHoverColor={palettes.secondary.light}
      />
    ),
    handle: "Test",
  },
  {
    name: "linkedin",
    icon: (
      <BaseIconButton
        size="md"
        fontSize="1.5rem"
        icon={faLinkedin}
        invertColors
        manualHoverColor={palettes.secondary.light}
      />
    ),
    handle: "Test",
  },
  {
    name: "youtube",
    icon: (
      <BaseIconButton
        size="md"
        fontSize="1.5rem"
        icon={faYoutube}
        invertColors
        manualHoverColor={palettes.secondary.light}
      />
    ),
    handle: "Test",
  },
  {
    name: "github",
    icon: (
      <BaseIconButton
        size="md"
        fontSize="1.5rem"
        icon={faGithub}
        invertColors
        manualHoverColor={palettes.secondary.light}
      />
    ),
    handle: "Test",
  },
];
