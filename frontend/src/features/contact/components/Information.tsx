import { FC, useEffect, useState } from 'react';

import { ButtonBar, ContactButtons } from '@/components/Built';
import { Flexer, Surface } from '@/components/Containers';
import { BaseProps } from '@/theme/base';

import { IconTextItem } from '@/components/Media';

import { ContactInformationContent } from '../types';
import { colors } from '@/theme/common';
import { useEditModeStore } from '@/stores/editmode';
import { FormGenerator } from '@/features/editable/components/FormGenerator';

interface InformationProps extends BaseProps {
  contactData: ContactInformationContent;
}

export const Information: FC<InformationProps> = ({ contactData, ...rest }) => {
  const { editMode } = useEditModeStore();
  const [data, setData] = useState<ContactInformationContent>(contactData);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setData(contactData);
  }, [contactData]);

  const updateContactData = (updateContactData: ContactInformationContent) => {
    setData(updateContactData);
    setEditing(false);
  };

  return (
    <Flexer j="c" {...rest}>
      {!editing ? (
        <div className="fade-in">
          {editMode && (
            <ButtonBar
              justifyContent="flex-end"
              editClick={() => setEditing(!editing)}
              adminLink="contactinformation"
              text="Contact Information"
              tooltipPosition="bottom"
            />
          )}
          <Surface boxShadow={0} a="c" j="c" px={3} py={2} br={1} mt={0} mb={0} maxWidth={300}>
            <IconTextItem
              textAlign="center"
              icon="email"
              text={data.email}
              subtext="Email"
              divider
            />
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
            <ContactButtons contactData={data} size="sm" mt={12} mb={6} borderRadius={16} />
          </Surface>
        </div>
      ) : (
        <FormGenerator
          title="Edit Contact Information"
          endpoint="contactinformation/1/"
          data={data}
          onUpdate={updateContactData}
          handleCancel={() => setEditing(!editing)}
          width={300}
          excludeKeys={[
            'id',
            'facebook',
            'linkedin',
            'instagram',
            'twitter',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
            'sunday',
            'set_name',
          ]}
          multilineKeys={['address']}
          px={2}
          py={2}
          fade
          placement="bottom"
          boxShadow
        />
      )}
    </Flexer>
  );
};
