import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Error.css";

import { palettes } from "../../../../utils";
import { Button, Text } from "../../../Components";
import { Flexer, Page, Surface } from "../../../Containers";

const Error = ({ message, description, instructions, thanks }) => {
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Page>
      <Surface fillHeight j="c" a="c">
        <Flexer j="c" fd="column" a="c">
          <div className="error-icon">!</div>
          <Text t="h4" fw="700" c={palettes.error.main} a="c">
            {message || "Oops, something went wrong!"}
          </Text>
          {description && (
            <Text t="body1" c={palettes.text.secondary} mb={12} a="c">
              {description}
            </Text>
          )}
          <Text t="body1" fw="400" c={palettes.text.secondary} a="c" w={400}>
            {instructions ||
              "We couldn't retrieve the data you were looking for. Please try again later."}
          </Text>
          <Button
            onClick={handleBackClick}
            startIcon="arrow_back"
            mt={16}
            size="sm"
            style={{ borderRadius: 4 }}
            w={100}
          >
            Go Back
          </Button>
          <Text t="body1" fw="400" mt={8} a="c" c={palettes.text.secondary}>
            {thanks}
          </Text>
        </Flexer>
      </Surface>
    </Page>
  );
};

export default Error;
