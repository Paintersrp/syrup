import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

import {
  BaseProps,
  Button,
  ButtonBar,
  ContactButtons,
  Flexer,
  FormGenerator,
  SocialButtons,
  Text,
} from "../../../../framework";
import { HeroData } from "../../Landing";
import { palettes } from "../../../../utils";

interface HeroProps extends BaseProps {
  data: HeroData;
  contactData: any;
  socialsData: any;
  editMode: boolean;
}

const Hero: React.FC<HeroProps> = ({
  data,
  contactData,
  socialsData,
  editMode,
  ...rest
}) => {
  const [heroData, setHeroData] = useState(data);
  const [editing, setEditing] = useState(false);

  const updateHeroBlock = (updatedHeroBlock: any) => {
    setHeroData(updatedHeroBlock);
    setEditing(false);
  };

  return (
    <Flexer j="c" a="fs" className="hero-container" {...rest}>
      <Flexer fd="column" className="hero-overlay">
        {!editing ? (
          <Flexer fd="column" a="c" className="hero-header-root fade-in">
            <Text t="h1" a="c" className="hero-header-title">
              {heroData.title}
            </Text>
            <Text t="body1" a="c" className="hero-header-subtitle">
              {heroData.subtitle}
            </Text>
            <Text t="body1" fw="600" a="c" className="hero-header-description">
              {heroData.description}
            </Text>
            <Flexer j="c" a="c">
              <Link to="/services">
                <Button
                  size="md"
                  startIcon="launch"
                  iconSize="16px"
                  manualHover={palettes.primary.light}
                  w={115}
                  style={{ borderRadius: 4 }}
                >
                  {heroData.buttonText}
                </Button>
              </Link>
            </Flexer>
            <ContactButtons contactData={contactData} borderRadius={4} />
            {editMode && (
              <ButtonBar
                justifyContent="center"
                editClick={() => setEditing(!editing)}
                adminLink="heroheader"
                text="Hero"
                tooltipPosition="bottom"
                mt={8}
              />
            )}
          </Flexer>
        ) : (
          <FormGenerator
            title="Edit Hero Header"
            endpoint="heroheader/main/"
            data={heroData}
            onUpdate={updateHeroBlock}
            handleCancel={() => setEditing(!editing)}
            width={325}
            excludeKeys={["name", "id"]}
            multilineKeys={["subtitle", "description"]}
            px={3}
            placement="bottom"
          />
        )}
        <Flexer j="c">
          <SocialButtons
            socialsData={socialsData}
            color="light"
            editMode={editMode}
          />
        </Flexer>
      </Flexer>
    </Flexer>
  );
};

export default Hero;
