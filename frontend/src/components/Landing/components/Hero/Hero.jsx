import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Hero.css";

import { Flexer } from "../../../../framework/Containers";
import { Button, Text } from "../../../../framework/Base";
import { Link } from "react-router-dom";

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
        {/* {!editing && editMode ? (
            <>
              <EditDeleteButtonMenu
                editClick={() => setEditing(!editing)}
                hideDelete
                placement="top"
                position="center"
                finalColor="white"
                adminLink="heroblock"
                text="Hero Block"
              />
            </>
          ) : null} */}
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
          </Flexer>
        ) : null}
        {/*  <HeroBlockEdit
              heroBlock={heroData}
              onUpdate={updateHeroBlock}
              handleCancel={() => setEditing(!editing)}
        />*/}

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
