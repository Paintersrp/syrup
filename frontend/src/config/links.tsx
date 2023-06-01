import React from "react";
import { WIP } from "../components";
import About from "../components/About/About";
import { Contact } from "../components/Contact";
import Landing from "../components/Landing/Landing";

export interface LinkType {
  to: string;
  text: string;
  footer: boolean;
  navbar: boolean;
  page: React.ReactNode;
}

export const LINKS: LinkType[] = [
  {
    to: "/",
    text: "Home",
    footer: true,
    navbar: true,
    page: <Landing />,
  },
  {
    to: "/about",
    text: "About",
    footer: true,
    navbar: true,
    page: <About />,
  },
  {
    to: "/contact",
    text: "Contact",
    footer: true,
    navbar: true,
    page: <Contact />,
  },
  {
    to: "/WIP",
    text: "WIP",
    footer: true,
    navbar: true,
    page: <WIP />,
  },
];
