import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { SOCIALS, SocialType } from "../../../../../config/socials";
import { palettes } from "../../../../../theme";

import { FormGenerator, IconButton, Text, Tooltip } from "../../../../Base";
import { Flexer } from "../../../../Containers";
import { ButtonBar } from "../../../Control";

interface SocialButtonsProps {
  socialsData: any;
  showTitle?: boolean;
  color?: "light" | "dark";
  editMode: boolean;
}

const SocialButtons: React.FC<SocialButtonsProps> = ({
  socialsData,
  showTitle,
  color = "light",
  editMode,
}) => {
  const auth = useSelector<any>((state) => state.auth);

  const [socials, setSocials] = useState(socialsData);
  const [editing, setEditing] = useState(false);
  let finalColor: string;

  if (color === "light") {
    finalColor = palettes.background.light;
  } else if (color === "dark") {
    finalColor = palettes.primary.main;
  }

  useEffect(() => {
    setSocials(socialsData);
  }, [socialsData]);

  const updateSocialData = (updateSocialData: any) => {
    setSocials(updateSocialData);
    setEditing(false);
  };

  return (
    <div style={{ marginTop: editing ? 16 : 0 }}>
      {!editing ? (
        <Flexer j="c" mt={8} fd="column" fade>
          {showTitle && <Text t="h4">Follow Us</Text>}
          <div>
            {SOCIALS.map((platform: SocialType) => {
              if (socials[platform.name]) {
                return (
                  <Tooltip
                    text={`@${socials[platform.name]}`}
                    position="bottom"
                    key={platform.name}
                  >
                    <IconButton
                      size="lg"
                      fontSize="1.5rem"
                      invertColors
                      manualHoverColor={palettes.secondary.main}
                      style={{ color: finalColor }}
                      aria-label={platform.name}
                      icon={platform.icon}
                      href={`https://www.${platform.name}.com/${
                        socials[platform.name]
                      }`}
                    />
                  </Tooltip>
                );
              } else {
                return null;
              }
            })}
          </div>
          {!editing && editMode && (
            <ButtonBar
              editClick={() => setEditing(!editing)}
              justifyContent="center"
              tooltipPosition="bottom"
              adminLink="contactinformation"
              text="Socials"
            />
          )}
        </Flexer>
      ) : (
        <FormGenerator
          title="Edit Socials"
          endpoint="socials/1/"
          data={socials}
          onUpdate={updateSocialData}
          handleCancel={() => setEditing(!editing)}
          width={325}
          excludeKeys={[
            "id",
            "email",
            "phone",
            "address",
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
            "set_name",
          ]}
          multilineKeys={[""]}
          px={3}
          py={0}
          fade
          placement="bottom"
        />
      )}
    </div>
  );
};

export default SocialButtons;
