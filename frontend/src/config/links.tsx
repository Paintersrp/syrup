import React from "react";
import About from "../components/About/About";
import Landing from "../components/Landing/Landing";
import WIPPage from "../components/WIP/WIPPage";

export interface Link {
  to: string;
  text: string;
  footer: boolean;
  navbar: boolean;
  page: React.ReactNode;
}

export const LINKS: Link[] = [
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
  { to: "/WIP", text: "WIP", footer: true, navbar: true, page: <WIPPage /> },
];