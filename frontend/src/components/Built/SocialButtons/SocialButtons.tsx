import { FC } from 'react';

import { Stagger } from '@/components/Animation';
import { BrandButton } from '@/components/Buttons/BrandButton/BrandButton';
import { IconButtonSize } from '@/components/Buttons';
import { Flexer } from '@/components/Containers';
import { Text, Tooltip } from '@/components/Elements';
import { Editable, useEditable } from '@/features/editable';
import { SOCIALS } from '@/settings';
import { SocialContent } from '@/types';

interface SocialButtonsProps {
  socialsData: any;
  showTitle?: boolean;
  buttonClass?: string;
  buttonSize?: IconButtonSize;
}

export const SocialButtons: FC<SocialButtonsProps> = ({
  socialsData,
  showTitle,
  buttonClass,
  buttonSize = 'sm',
}) => {
  const [editableData, editConfig] = useEditable({
    name: 'socials',
    data: socialsData,
    endpoint: `socials/1/`,
    editMenuAlign: 'center',
    editMenuPosition: 'bottom',
    multilineKeys: ['subtitle'],
    formSettings: {
      width: 325,
      px: 3,
      py: 0,
    },
  });

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
            if (editableData[platform.name]) {
              return (
                <Tooltip
                  text={`@${editableData[platform.name]}`}
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
                    href={`https://www.${platform.name}.com/${editableData[platform.name]}`}
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
