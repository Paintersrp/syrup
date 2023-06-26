import { FC, useEffect, useState } from 'react';

import { Flexer, Item, Surface } from '@/components/Containers';
import { Divider, Text, Tooltip } from '@/components/Elements';
import { Media } from '@/components/Media';
import { Editable } from '@/features/editable';
import { useBreakpoint } from '@/hooks';
import { SOCIALS } from '@/settings';
import { BaseProps } from '@/theme/base';

import { MemberContent } from '../types';
import { BrandButton } from '@/components/Buttons/BrandButton/BrandButton';

interface MemberProps extends BaseProps {
  member: MemberContent;
  editMode?: any;
  newImage?: any;
}

export const Member: FC<MemberProps> = ({ member, editMode = false, newImage, ...rest }) => {
  const [editing, setEditing] = useState(false);
  const [memberData, setMemberData] = useState(member);
  const isLargeScreen = useBreakpoint('lg');

  useEffect(() => {
    setMemberData(member);
  }, [member]);

  const updateMember = (updateMember: typeof memberData) => {
    setMemberData(updateMember);
    setEditing(false);
  };

  const editConfig = {
    name: 'member',
    data: memberData,
    endpoint: `teammember/${memberData.id}/`,
    editMenuPosition: 'bottom',
    onUpdate: updateMember,
    id: memberData.id,
    formSettings: {
      width: !isLargeScreen ? 350 : 350,
    },
    ...rest,
  };

  return (
    <Item xs={12} md={6} key={memberData.name} {...rest}>
      <Editable {...editConfig}>
        <Surface
          br={1}
          boxShadow={1}
          className="fade-in"
          style={{ maxWidth: 320 }}
          mt={0}
          px={2}
          py={2}
        >
          <Flexer j="fs" a="fs">
            <div style={{ width: '60%' }}>
              <Media
                src={newImage ? newImage : memberData.image}
                boxShadow={0}
                altText="member-image"
              />
            </div>
            <Flexer fd="column" w="auto">
              <Text t="h6" fw="bold" s="1.3rem" pl={8}>
                {memberData.name}
              </Text>
              <Text t="body1" fw="bold" s="0.9rem" pl={8}>
                {memberData.role}
              </Text>
            </Flexer>
          </Flexer>
          <Divider mt={16} mb={8} />
          <Flexer a="fs" fd="column">
            <Text t="body1" fw="bold" s="0.95rem" mb={4}>
              Biography
            </Text>
            <Text t="body1" s="0.9rem" fw={500}>
              {member.bio}
            </Text>
          </Flexer>
          <Flexer j="c" gap={4} mt={4}>
            {SOCIALS.map((platform) => {
              if (memberData[platform.name]) {
                return (
                  <Tooltip
                    text={`@${memberData[platform.name]}`}
                    position="bottom"
                    key={platform.name}
                  >
                    <BrandButton
                      variant="hover"
                      size="sm"
                      fontSize="1.25rem"
                      aria-label={platform.name}
                      icon={platform.icon}
                      href={`https://www.${platform.name}.com/${memberData[platform.name]}`}
                    />
                  </Tooltip>
                );
              } else {
                return null;
              }
            })}
          </Flexer>
        </Surface>
      </Editable>
    </Item>
  );
};
