import { FC } from 'react';

import { Flexer, Item } from '@/components/Containers';
import { Divider, Text } from '@/components/Elements';
import { Base } from '@/theme/base';

import { Media } from '@/components/Media';

import { useServiceData } from './ServiceProvider';
import { ServiceFeatures } from './ServiceFeatures';
import { defaultColors } from '@/theme';

type ServiceAboutProps = {};

export const ServiceInformation: FC<ServiceAboutProps> = ({}) => {
  const { data } = useServiceData();

  return (
    <Item xs={12} sm={12} md={12} lg={8}>
      <Flexer fd="column" w="85%" j="c" a="c" mb={48}>
        <Base minw="100%" mb={24} bs={1} br={8}>
          <Media
            src={data.image}
            altText={data.service_title}
            // imageStyle={{ borderRadius: 0 }}
          />
        </Base>
        <Text t="h2" a="l">
          About Our {data.service_title} Service
        </Text>
        <Divider mt={2} mb={12} />

        <Text t="body1" mb={16}>
          {data.paragraph_one}
        </Text>
        <Text t="body1" mb={8}>
          {data.paragraph_two}
        </Text>

        {/* Add to other edit and use data from context? */}
        <ServiceFeatures />

        <Text t="body1" mb={16}>
          {data.paragraph_three}
        </Text>

        <Text t="h2" mb={8} fw="bold" a="c" u uo={6} c={defaultColors.primary}>
          ${data.price}/mo
        </Text>
      </Flexer>
    </Item>
  );
};
