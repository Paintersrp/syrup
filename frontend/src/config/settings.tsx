import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { palettes } from "../theme";

export const TITLE: string = "DEBLUR";

export const LOGO: React.ReactNode = (
  <FontAwesomeIcon
    icon={faCoins}
    style={{ fontSize: "1.5rem", color: palettes.secondary.main }}
  />
);
