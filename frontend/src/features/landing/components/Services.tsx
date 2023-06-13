import React from 'react';

import { Carousel } from '@/components/Animation';
import { Container, Flexer, Item } from '@/components/Containers';

import { Service } from './Service';

const services = [
  {
    id: 1,
    title: 'Basic',
    price: '$9.99',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
  },
  {
    id: 2,
    title: 'Standard',
    price: '$19.99',
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Featureeeeeee 4'],
  },
  {
    id: 3,
    title: 'Premium',
    price: '$29.99',
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
  },
];

interface ServicesProps {
  carousel?: boolean;
}

export const Services: React.FC<ServicesProps> = ({ carousel = false, ...rest }) => {
  return (
    <Flexer j="c" mt={64} mb={64} {...rest}>
      {carousel ? (
        <Carousel>
          {services.map((service) => (
            <Service service={service} />
          ))}
        </Carousel>
      ) : (
        <Container style={{ maxWidth: 1200 }}>
          {services.map((service) => (
            <Item xs={12} sm={12} md={6} lg={4} style={{ padding: 8 }}>
              <Service service={service} />
            </Item>
          ))}
        </Container>
      )}
    </Flexer>
  );
};
