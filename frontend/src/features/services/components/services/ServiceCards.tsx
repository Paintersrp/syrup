import { FC } from 'react';
import { css } from '@emotion/react';

import { Carousel } from '@/components/Animation';
import { Button } from '@/components/Buttons';
import { Container, Flexer, Item } from '@/components/Containers';
import { Link, Text } from '@/components/Elements';
import { Icon, Media } from '@/components/Media';
import { Base } from '@/theme/base';
import { ExtendedTheme } from '@/theme/types';
import { inject } from '@/theme/utils';

import { ServiceType } from '../../types';

const styles = (theme: ExtendedTheme) => ({
  root: css({
    transition: 'transform 0.3s ease-in-out',
    cursor: 'pointer',

    '&:hover': {
      transform: 'translateY(-5px)',
    },
  }),
  media: css({
    borderBottomLeftRadius: theme.imageBorderBottomLeftRadius,
    borderBottomRightRadius: theme.imageBorderBottomRightRadius,
  }),
  icon: css({
    left: 45,
    position: 'relative',
  }),
});

interface ServiceCardProps {
  service: ServiceType;
}

export const ServiceCard: FC<ServiceCardProps> = ({ service, ...rest }) => {
  const css = inject(styles);

  return (
    <Base d="flex" fd="column" w={325} br={8} bs={1} css={css.root} {...rest}>
      <Media
        altText={`service-${service.id}-image`}
        src={service.image}
        imageStyle={css.media}
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
            <Icon icon="check" size="20px" css={css.icon} color="primaryLight" />
            <Text t="body1" a="c" fw="400" s="14px" mr={20}>
              {feature.detail}
            </Text>
          </Flexer>
        ))}
      </Flexer>
      <Flexer j="c" mt={10} mb={20}>
        <Link to={`/services/${service.id}`}>
          <Button size="sm" startIcon="link" w={110} palette="secondary">
            Learn More
          </Button>
        </Link>
      </Flexer>
    </Base>
  );
};

interface ServiceCardsProps {
  services: ServiceType[];
  carousel?: boolean;
}

export const ServiceCards: FC<ServiceCardsProps> = ({
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
    supported_sites: [{ id: 1, detail: 'Site 1' }],
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
    supported_sites: [{ id: 1, detail: 'Site 1' }],
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
    supported_sites: [{ id: 1, detail: 'Site 1' }],
    image: 'https://source.unsplash.com/1400x902/?service',
  },
];
