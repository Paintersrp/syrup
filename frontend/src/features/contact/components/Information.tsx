import { FC, useEffect, useState } from 'react';

import { ContactButtons } from '@/components/Built';
import { Surface } from '@/components/Containers';
import { IconTextItem } from '@/components/Media';
import { Editable } from '@/features/editable';
import { BaseProps } from '@/theme/base';
import { colors } from '@/theme/common';

import { ContactInformationContent } from '../types';

interface InformationProps extends BaseProps {
  contactData: ContactInformationContent;
}

export const Information: FC<InformationProps> = ({ contactData, ...rest }) => {
  const [data, setData] = useState<ContactInformationContent>(contactData);

  useEffect(() => {
    setData(contactData);
  }, [contactData]);

  const updateContactData = (updateContactData: ContactInformationContent) => {
    setData(updateContactData);
  };

  const editConfig = {
    name: 'contacts',
    data: data,
    endpoint: `contactinformation/1/`,
    onUpdate: updateContactData,
    formSettings: {
      width: 325,
    },
    ...rest,
  };

  return (
    <Editable {...editConfig}>
      <Surface
        boxShadow={0}
        a="c"
        j="c"
        px={3}
        py={2}
        br={1}
        mt={0}
        mb={0}
        maxWidth={300}
        className="fade-in"
      >
        <IconTextItem textAlign="center" icon="email" text={data.email} subtext="Email" divider />
        <IconTextItem
          textAlign="center"
          icon="phone"
          text={data.phone}
          subtext="Phone"
          iconColor={colors.secondary.main}
          divider
        />
        <IconTextItem
          textAlign="center"
          icon="location_on"
          text={data.address}
          subtext="Address"
          divider
        />
        <ContactButtons contactData={data} size="sm" mt={12} mb={6} borderRadius={4} />
      </Surface>
    </Editable>
  );
};
