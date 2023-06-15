import { FC, Fragment } from 'react';

import { Button } from '@/components/Buttons';
import { Flexer } from '@/components/Containers';
import { Text } from '@/components/Elements';

import { ServiceType } from '../../types';

type ServiceHeaderProps = {
  data: ServiceType;
  handleApplyNowClick: any;
};

// Add Editing

export const ServiceHeader: FC<ServiceHeaderProps> = ({ data, handleApplyNowClick }) => {
  return (
    <Fragment>
      <Flexer j="fe">
        <Button onClick={handleApplyNowClick} startIcon="approval" w={100}>
          Act Now
        </Button>
      </Flexer>
      <Text t="h1" a="c" mb={24}>
        {data.service_title}
      </Text>
    </Fragment>
  );
};
