import React, { useEffect, useState } from 'react';

import { SOCIALS } from '@/settings';

import { IconButtonSize } from '@/components/Buttons';
import { Flexer } from '@/components/Containers';
import { Text, Tooltip } from '@/components/Elements';

import { Stagger } from '@/components/Animation';
import { ButtonBar } from '../../../features/editable/components/ButtonBar';
import { SocialContent } from '@/types';
import { colors } from '@/theme/common';
import { FormGenerator } from '@/features/editable/components/FormGenerator';
import { BrandButton } from '@/components/Buttons/BrandButton/BrandButton';

interface SocialButtonsProps {
  socialsData: any;
  showTitle?: boolean;
  color?: 'light' | 'dark';
  editMode: boolean;
  invertColors?: boolean;
  buttonClass?: string;
  buttonSize?: IconButtonSize;
}

export const SocialButtons: React.FC<SocialButtonsProps> = ({
  socialsData,
  showTitle,
  color = 'light',
  editMode,
  invertColors = true,
  buttonClass,
  buttonSize = 'sm',
}) => {
  const [socials, setSocials] = useState(socialsData);
  const [editing, setEditing] = useState(false);
  let finalColor: string;

  if (color === 'light') {
    finalColor = colors.background.light;
  } else if (color === 'dark') {
    finalColor = colors.primary.main;
  }

  useEffect(() => {
    setSocials(socialsData);
  }, [socialsData]);

  const updateSocialData = (updateSocialData: any) => {
    setSocials(updateSocialData);
    setEditing(false);
  };

  return (
    <div style={{ marginTop: editing ? 16 : 0 }}>
      {!editing ? (
        <Flexer j="c" mt={8} fd="column" fade>
          {showTitle && (
            <Text t="h4" a="c" mb={4}>
              Follow Us
            </Text>
          )}

          {!editing && editMode && (
            <div style={{ width: 300, marginBottom: 4 }}>
              <ButtonBar
                editClick={() => setEditing(!editing)}
                justifyContent="flex-end"
                tooltipPosition="bottom"
                adminLink="contactinformation"
                text="Socials"
              />
            </div>
          )}

          <Stagger direction="left" orientation="horizontal" gap={6}>
            {SOCIALS.map((platform: SocialContent, index: number) => {
              if (socials[platform.name]) {
                return (
                  <Tooltip
                    text={`@${socials[platform.name]}`}
                    position="bottom"
                    key={`${platform.name}-${index}`}
                  >
                    <BrandButton
                      variant="float"
                      palette="smoke"
                      size={buttonSize}
                      fontSize="1.5rem"
                      aria-label={platform.name}
                      icon={platform.icon}
                      href={`https://www.${platform.name}.com/${socials[platform.name]}`}
                      className={buttonClass}
                    />
                  </Tooltip>
                );
              } else {
                return null;
              }
            })}
          </Stagger>
        </Flexer>
      ) : (
        <FormGenerator
          title="Edit Socials"
          endpoint="socials/1/"
          data={socials}
          onUpdate={updateSocialData}
          handleCancel={() => setEditing(!editing)}
          width={325}
          excludeKeys={[
            'id',
            'email',
            'phone',
            'address',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
            'sunday',
            'set_name',
          ]}
          multilineKeys={['']}
          px={3}
          py={0}
          placement="bottom"
        />
      )}
    </div>
  );
};
