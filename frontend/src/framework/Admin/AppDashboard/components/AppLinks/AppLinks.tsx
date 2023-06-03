import React from "react";
import { Link } from "react-router-dom";
import "./AppLinks.css";

import PanelHeader from "../PanelHeader/PanelHeader";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { List, ListItem, Tooltip } from "../../../../Base";
import { Collapser, Flexer, Surface } from "../../../../Containers";

interface AppLinksProps {
  appName: string | undefined;
  links: { [key: string]: string };
  open: boolean;
  toggleOpen: () => void;
}

const AppLinks: React.FC<AppLinksProps> = ({
  appName,
  links,
  open,
  toggleOpen,
}) => {
  return (
    <Surface
      className="app-stats-root"
      j="fs"
      a="c"
      maxWidth={1200}
      boxShadow={0}
      px={0}
      py={0}
      mt={8}
      mb={8}
      pr={2}
      pl={2}
    >
      <PanelHeader header="Links" open={open} toggleOpen={toggleOpen} />
      <Collapser isOpen={open}>
        <div>
          <List boxShadow={1} px={0} dividers className="list-border-radius">
            {Object.entries(links).map(([linkName, link], index) => {
              console.log(linkName, "linkName");

              return (
                <Flexer className="hover-link" pl={12} key={linkName}>
                  <Tooltip
                    text={`View ${linkName}`}
                    position="right"
                    style={{ width: "100%" }}
                  >
                    <Link
                      to={`${link}`}
                      state={{
                        appName: linkName.includes("Analysis") ? null : appName,
                      }}
                    >
                      <Flexer>
                        <ListItem
                          icon={faCode}
                          style={{ color: "black", width: "100%" }}
                          text={linkName}
                          textAlign="right"
                        />
                      </Flexer>
                    </Link>
                  </Tooltip>
                </Flexer>
              );
            })}
          </List>
        </div>
      </Collapser>
    </Surface>
  );
};

export default AppLinks;
