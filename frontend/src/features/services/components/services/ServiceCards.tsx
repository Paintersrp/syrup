import React from 'react';
import { Link } from 'react-router-dom';
import './css/Service.css';

import { Carousel } from '@/components/Animation';
import { Button } from '@/components/Buttons';
import { Container, Flexer, Item } from '@/components/Containers';
import { Base, Text } from '@/components/Elements';
import { MaterialIcon, Media } from '@/components/Media';
import { palettes } from '@/utils';

import { ServiceType } from '../../types';

interface ServiceCardProps {
  service: ServiceType;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, ...rest }) => {
  return (
    <Base key={service.id} className="service-card" {...rest}>
      <Media
        altText={`service-${service.id}-image`}
        src={service.image}
        mediaClass="service-card-media"
        boxShadow={0}
      />
      <Text t="h2" a="c" s="24px" mb={10} mt={10}>
        {service.service_title}
      </Text>
      <Text t="body1" a="c" fw="500" s="1.05rem" mb={10}>
        ${service.price}/month
      </Text>
      <Flexer fd="column" mb={10} gap={2} a="c" j="fs" grow minh={155}>
        {service.features.map((feature, index) => (
          <Flexer j="c" key={index}>
            <MaterialIcon
              icon="check"
              size="20px"
              className="service-card-icon"
              color={palettes.info.dark}
            />
            <Text t="body1" a="c" fw="400" s="14px" mr={20}>
              {feature.detail}
            </Text>
          </Flexer>
        ))}
      </Flexer>
      <Flexer j="c" mt={10} mb={20}>
        <Link to={`/services/${service.id}`}>
          <Button size="sm" startIcon="link" w={110} color="secondary">
            Learn More
          </Button>
        </Link>
      </Flexer>
    </Base>
  );
};

const servicesDemo: ServiceType[] = [
  {
    id: 1,
    service_title: 'Basic',
    price: '9.99',
    features: [
      { id: 1, detail: 'Feature 1' },
      { id: 2, detail: 'Feature 2' },
      { id: 3, detail: 'Feature 3' },
    ],
    image: 'https://source.unsplash.com/1400x900/?service',
  },
  {
    id: 2,
    service_title: 'Standard',
    price: '19.99',
    features: [
      { id: 1, detail: 'Feature 1' },
      { id: 2, detail: 'Feature 2' },
      { id: 3, detail: 'Feature 3' },
      { id: 4, detail: 'Feature 4' },
      { id: 5, detail: 'Feature 5' },
    ],
    image: 'https://source.unsplash.com/1400x901/?service',
  },
  {
    id: 3,
    service_title: 'Premium',
    price: '29.99',
    features: [
      { id: 1, detail: 'Feature 1' },
      { id: 2, detail: 'Feature 2' },
      { id: 3, detail: 'Feature 3' },
      { id: 4, detail: 'Feature 4' },
      { id: 5, detail: 'Feature 5' },
      { id: 6, detail: 'Feature 6' },
      { id: 7, detail: 'Feature 7' },
    ],
    image: 'https://source.unsplash.com/1400x902/?service',
  },
];

interface ServiceCardsProps {
  services: ServiceType[];
  carousel?: boolean;
}

export const ServiceCards: React.FC<ServiceCardsProps> = ({
  services = servicesDemo,
  carousel = false,
  ...rest
}) => {
  return (
    <Flexer j="c" mt={64} mb={64} {...rest}>
      {carousel ? (
        <Carousel>
          {services.map((service) => (
            <ServiceCard service={service} />
          ))}
        </Carousel>
      ) : (
        <Container style={{ maxWidth: 1200 }}>
          {services.map((service) => (
            <Item xs={12} sm={12} md={6} lg={4} style={{ padding: 8 }}>
              <ServiceCard service={service} />
            </Item>
          ))}
        </Container>
      )}
    </Flexer>
  );
};
