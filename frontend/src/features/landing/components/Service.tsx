import './css/Service.css';

import { MaterialIcon, Media } from '@/components/Media';
import { Base, Text } from '@/components/Elements';
import { Flexer } from '@/components/Containers';
import { palettes } from '@/utils';
import { Button } from '@/components/Buttons';
import React from 'react';

interface ServiceProps {
  service: any;
}

const Service: React.FC<ServiceProps> = ({ service, ...rest }) => {
  return (
    <Base key={service.id} className="service-card" {...rest}>
      <Media
        altText={`service-${service.td}-image`}
        src={`https://source.unsplash.com/1400x${900 + service.id}/?service`}
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
        {service.features.map((feature: any, featureIndex: number) => (
          <Flexer j="c" key={featureIndex}>
            <MaterialIcon
              icon="check"
              size="20px"
              className="service-card-icon"
              color={palettes.info.dark}
            />
            <Text t="body1" a="c" fw="400" s="14px" mr={20}>
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
    </Base>
  );
};

export default Service;
