import { FC } from 'react';

import { ContactButtons } from '@/components/Built';
import { Surface } from '@/components/Containers';
import { IconTextItem } from '@/components/Media';
import { Editable, useEditable } from '@/features/editable';
import { BaseProps } from '@/theme/base';
import { colors } from '@/theme/common';

import { ContactInformationContent } from '../types';

interface InformationProps extends BaseProps {
  contactData: ContactInformationContent;
}

export const Information: FC<InformationProps> = ({ contactData, ...rest }) => {
  const [editableData, editConfig] = useEditable({
    name: 'contacts',
    data: contactData,
    endpoint: `contactinformation/1/`,
    editMenuPosition: 'bottom',
    formSettings: {
      width: 325,
    },
  });

  return (
    <Editable {...editConfig} {...rest}>
      <Surface a="c" j="c" px={3} py={2} maxWidth={300} className="fade-in">
        <IconTextItem
          textAlign="center"
          icon="email"
          text={editableData.email}
          subtext="Email"
          divider
        />
        <IconTextItem
          textAlign="center"
          icon="phone"
          text={editableData.phone}
          subtext="Phone"
          iconColor="secondary"
          divider
        />
        <IconTextItem
          textAlign="center"
          icon="location_on"
          text={editableData.address}
          subtext="Address"
          divider
        />
        <ContactButtons contactData={editableData} size="sm" mt={12} mb={6} borderRadius={4} />
      </Surface>
    </Editable>
  );
};
