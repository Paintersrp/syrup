import { FC, useState } from 'react';

import { FadeOnScroll } from '@/components/Animation';
import { Flexer } from '@/components/Containers';
import { Divider, Text } from '@/components/Elements';
import { Editable } from '@/features/editable';
import { useBreakpoint } from '@/hooks';
import { colors } from '@/theme/common';

type AlignmentType = 'Left' | 'Right' | 'Center' | 'left' | 'right' | 'center';

export interface SectionHeaderContent {
  subtitle?: string;
  title?: string;
  description?: string;
  alignment: AlignmentType;
  showDivider?: boolean;
  name: string;
  id: number;
}

interface SectionHeaderProps {
  headerData: SectionHeaderContent;
  formTitle: string;
}

export const SectionHeader: FC<SectionHeaderProps> = ({ headerData, formTitle }) => {
  const getAlignClass = (alignment: AlignmentType) => {
    switch (alignment) {
      case 'Left':
      case 'left':
        return 'left';
      case 'Right':
      case 'right':
        return 'right';
      case 'Center':
      case 'center':
        return 'center';
      default:
        return 'left';
    }
  };

  const isLargeScreen = useBreakpoint('lg');
  const [header, setHeader] = useState<SectionHeaderContent>(headerData);
  const alignClass = getAlignClass(headerData.alignment);

  const updateSectionHeader = (updatedHeader: SectionHeaderContent) => {
    setHeader(updatedHeader);
  };

  const editConfig = {
    name: 'header',
    data: header,
    id: header.id,
    endpoint: `sectionheader/${header.name}/`,
    onUpdate: updateSectionHeader,
    editMenuAlign: 'center',
    excludeKeys: header.description
      ? ['name', 'id', 'alignment', 'show_divider']
      : ['name', 'id', 'alignment', 'show_divider', 'description'],
    formSettings: {
      width: 375,
      px: 3,
      py: 1.5,
    },
  };

  return (
    <Editable {...editConfig}>
      <Flexer fd="column">
        {header.subtitle && (
          <FadeOnScroll onScreenPercentage={0.1} animationDuration={0.5}>
            <Text t="subtitle1" a="c" s="0.95rem" fw="600" c={colors.secondary.main}>
              {header.subtitle}
            </Text>
          </FadeOnScroll>
        )}

        {header.title && (
          <FadeOnScroll onScreenPercentage={0.1} animationDuration={1.5}>
            <Text t="h2" a={alignClass} s="2rem" fw="600" mb={8}>
              {header.title}
            </Text>
          </FadeOnScroll>
        )}
      </Flexer>
      {header.description && (
        <Flexer fd="column" a="c">
          <FadeOnScroll onScreenPercentage={0.1} animationDuration={2.5}>
            <Text t="h5" a={alignClass} s="0.95rem" fw="500" mb={16} w={isLargeScreen ? 325 : 500}>
              {header.description}
            </Text>
          </FadeOnScroll>
        </Flexer>
      )}
      {header.showDivider && (
        <div style={{ width: '90%' }}>
          <Divider color={colors.text.min} />
        </div>
      )}
    </Editable>
  );
};
