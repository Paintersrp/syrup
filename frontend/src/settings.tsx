import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookSquare,
  faTwitter,
  faInstagram,
  faLinkedin,
  faYoutube,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

import { Tracker, WIPPage } from "./components";
import { palettes } from "./theme";
import About from "./framework/Prebuilt/About/About";

// Title of the application
export const TITLE: string = "DEBLUR";

// Logo of the application using FontAwesomeIcon
export const LOGO: React.ReactNode = (
  <FontAwesomeIcon
    icon={faCoins}
    style={{ fontSize: "1.5rem", color: palettes.secondary.main }}
  />
);

// Define the interface for a link
// Array of links with their respective properties
export interface Link {
  to: string;
  text: string;
  footer: boolean;
  navbar: boolean;
  page: React.ReactNode;
}

export const LINKS: Link[] = [
  { to: "/", text: "Home", footer: true, navbar: true, page: <Tracker /> },
  {
    to: "/about",
    text: "About",
    footer: true,
    navbar: true,
    page: <About />,
  },
  { to: "/WIP", text: "WIP", footer: true, navbar: true, page: <WIPPage /> },
];

// Define the interface for a social media link
// Array of social media links with their respective properties
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
