import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import React, { FC, MouseEvent } from "react";
import { Flexer } from "../../Containers";
import Icon from "../Icon/Icon";
import Text from "../Text/Text";
import "./List.css";

interface ListItemProps {
  text?: string;
  subtext?: string;
  icon?: IconDefinition | null;
  button?: boolean;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
  className?: string;
  iconColor?: string;
  textAlign?: "left" | "right" | "center";
}

const ListItem: FC<ListItemProps> = ({
  text,
  subtext,
  icon,
  button = false,
  onClick = () => {},
  style,
  className,
  iconColor = "primary",
  textAlign = "left",
}) => {
  return (
    <div
      className={`list-item ${className}`}
      onClick={onClick}
      style={{ ...style, cursor: button ? "pointer" : undefined }}
    >
      {icon ? (
        <Flexer j="sb">
          <Icon
            fontSize="1.25rem"
            color={iconColor || "primary"}
            icon={icon}
            style={{ order: textAlign === "right" ? 0 : 2 }}
            mr={textAlign !== "right" ? 16 : 0}
            ml={textAlign === "right" ? 16 : 0}
          />
          <Flexer
            fd="column"
            style={{
              order: textAlign === "right" ? 1 : 0,
              marginRight: textAlign === "right" ? 16 : 0,
              marginLeft: textAlign !== "right" ? 16 : 0,
            }}
          >
            <Text t="h5" a={textAlign}>
              {text}
            </Text>
            {subtext && (
              <Text mt={0} a={textAlign}>
                {subtext}
              </Text>
            )}
          </Flexer>
        </Flexer>
      ) : (
        <Flexer
          fd="column"
          style={{
            marginRight: textAlign === "right" ? 16 : 0,
            marginLeft: textAlign !== "right" ? 16 : 0,
          }}
        >
          <Text t="h5" a={textAlign}>
            {text}
          </Text>
          {subtext && (
            <Text mt={0} a={textAlign}>
              {subtext}
            </Text>
          )}
        </Flexer>
      )}
    </div>
  );
};

export default ListItem;
