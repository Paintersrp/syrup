import React, { useEffect } from "react";
import { Page } from "../../Containers";
import { ImageHeader } from "./components";

interface AboutProps {
  // Add your prop types here
}

const About: React.FC<AboutProps> = ({}) => {
  useEffect(() => {
    console.log("replace_me");
  }, []);

  return (
    <Page>
      <ImageHeader />
    </Page>
  );
};

export default About;
