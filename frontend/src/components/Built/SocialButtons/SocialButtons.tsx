import React, { useEffect, useState } from 'react';

import { SOCIALS } from '@/settings';

import { IconButtonSize } from '@/components/Buttons';
import { Flexer } from '@/components/Containers';
import { Text, Tooltip } from '@/components/Elements';

import { Stagger } from '@/components/Animation';
import { SocialContent } from '@/types';
import { colors } from '@/theme/common';
import { BrandButton } from '@/components/Buttons/BrandButton/BrandButton';

import { Editable } from '@/features/editable';

interface SocialButtonsProps {
  socialsData: any;
  showTitle?: boolean;
  color?: 'light' | 'dark';
  buttonClass?: string;
  buttonSize?: IconButtonSize;
}

export const SocialButtons: React.FC<SocialButtonsProps> = ({
  socialsData,
  showTitle,
  color = 'light',
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

  const editConfig = {
    name: 'socials',
    data: socials,
    endpoint: 'socials/1/',
    onUpdate: updateSocialData,
    editMenuPosition: 'bottom',
    editMenuAlign: 'center',
    multilineKeys: ['subtitle'],
    excludeKeys: ['set_name'],
    formSettings: {
      width: 325,
      px: 3,
      py: 0,
    },
  };

  return (
    <Editable {...editConfig} mt={16}>
      <Flexer j="c" mt={8} fd="column" fade>
        {showTitle && (
          <Text t="h4" a="c" mb={4}>
            Follow Us
          </Text>
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
    </Editable>
  );
};
