import React from "react";
import "./Service.css";

import {
  Button,
  MaterialIcon,
  Media,
  Text,
} from "../../../../../../framework/Base";
import { Flexer } from "../../../../../../framework/Containers";
import { palettes } from "../../../../../../utils/theming/theme";

const Service = ({ service }) => {
  return (
    <div key={service.id} className="service-card">
      <Media
        src={`https://source.unsplash.com/1400x${900 + service.id}/?service`}
        size="card"
        mediaClass="service-card-media"
        boxShadow={1}
      />
      <Text t="h2" a="c" s="24px" mb={10} mt={10}>
        {service.title}
      </Text>
      <Text t="body1" a="c" fw="400" s="16px" mb={10}>
        {service.price}
      </Text>
      <Flexer fd="column" mb={10} gap={2} a="c" j="fs" grow>
        {service.features.map((feature, featureIndex) => (
          <Flexer j="c">
            <MaterialIcon
              icon="check"
              size="20px"
              className="service-card-icon"
              color={palettes.info.dark}
            />
            <Text t="body1" a="c" fw="400" s="14px" key={featureIndex} mr={20}>
              {feature}
            </Text>
          </Flexer>
        ))}
      </Flexer>
      <Flexer j="c" mt={10} mb={20}>
        <Button startIcon="link" w={110} color="secondary">
          Learn More
        </Button>
      </Flexer>
    </div>
  );
};

export default Service;
