import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Hero.css";

import { Flexer } from "../../../../framework/Containers";
import { Button, Text } from "../../../../framework/Base";
import { Link } from "react-router-dom";
import { ButtonBar } from "../../../../framework/Prebuilt";
import HeroEdit from "./HeroEdit/HeroEdit";

// function Hero({ data, contactData, socialData, editMode, form = true }) {
function Hero({}) {
  //   const [heroData, setHeroData] = useState(data);
  const [editing, setEditing] = useState(false);
  const auth = useSelector((state) => state.auth);

  const updateHeroBlock = (updatedHeroBlock) => {
    setHeroData(updatedHeroBlock);
    setEditing(false);
  };

  return (
    <Flexer j="c" a="fs" className="hero-container">
      <Flexer fd="column" className="hero-overlay">
        {!editing ? (
          <Flexer fd="column" className="hero-header-root">
            <Text a="c" className="hero-header-title">
              Placeholder
            </Text>
            <Text
              t="h1"
              a="c"
              className="hero-header-subtitle"
              dangerouslySetInnerHTML={{ __html: "Placeholder" }}
            />
            <Text a="c" className="hero-header-description">
              Placeholder
            </Text>
            <Flexer j="c" a="c" mt={10}>
              <Link to="/services">
                <Button>Placeholder</Button>
              </Link>
            </Flexer>
            <ButtonBar
              justifyContent="c"
              editClick={() => setEditing(!editing)}
              adminLink="heroblock"
              text="Hero"
              tooltipPosition="bottom"
              mt={8}
            />
          </Flexer>
        ) : (
          <HeroEdit
            heroBlock={{ title: "1", subtitle: "2" }}
            onUpdate={updateHeroBlock}
            handleCancel={() => setEditing(!editing)}
          />
        )}

        {/* <Grid item xs={12} md={12}>
            <ContactButtons contactData={contactData} />
            <Grid container flex justifyContent="center">
              <Social
                contactData={socialData}
                color="light"
                editMode={editMode}
              />
            </Grid>
          </Grid>*/}
      </Flexer>

      {/* {form ? <HeroForm editMode={editMode} /> : null}  */}
    </Flexer>
  );
}

export default Hero;
