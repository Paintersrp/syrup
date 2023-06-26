import { FC } from 'react';

import { FadeOnScroll } from '@/components/Animation';
import { Flexer } from '@/components/Containers';
import { Divider, Text } from '@/components/Elements';
import { Editable, useEditable } from '@/features/editable';
import { useBreakpoint } from '@/hooks';
import { colors } from '@/theme/common';

type AlignmentType = 'Left' | 'Right' | 'Center' | 'left' | 'right' | 'center';

export interface SectionHeaderContent {
  subtitle?: string;
  title?: string;
  description?: string;
  alignment: AlignmentType;
  show_divider?: boolean;
  name: string;
  id: number;
}

interface SectionHeaderProps {
  headerData: SectionHeaderContent;
  formTitle: string;
}

export const SectionHeader: FC<SectionHeaderProps> = ({ headerData }) => {
  const alignClass = getAlignClass(headerData.alignment);
  const isLargeScreen = useBreakpoint('lg');

  const [editableData, editConfig] = useEditable({
    name: 'header',
    data: headerData,
    endpoint: `sectionheader/${headerData.name}/`,
    editMenuAlign: 'center',
    excludeKeys: headerData.description
      ? ['name', 'id', 'alignment', 'show_divider']
      : ['name', 'id', 'alignment', 'show_divider', 'description'],
    formSettings: {
      width: 375,
      px: 3,
      py: 1.5,
    },
  });

  return (
    <Editable {...editConfig}>
      <Flexer fd="column">
        {editableData.subtitle && (
          <FadeOnScroll onScreenPercentage={0.1} animationDuration={0.5}>
            <Text t="subtitle1" a="c" s="0.95rem" fw="600" c="secondary">
              {editableData.subtitle}
            </Text>
          </FadeOnScroll>
        )}

        {editableData.title && (
          <FadeOnScroll onScreenPercentage={0.1} animationDuration={1.5}>
            <Text t="h2" a={alignClass} s="2rem" fw="600" mb={8}>
              {editableData.title}
            </Text>
          </FadeOnScroll>
        )}
      </Flexer>
      {editableData.description && (
        <Flexer fd="column" a="c">
          <FadeOnScroll onScreenPercentage={0.1} animationDuration={2.5}>
            <Text t="h5" a={alignClass} s="0.95rem" fw="500" mb={16} w={isLargeScreen ? 325 : 500}>
              {editableData.description}
            </Text>
          </FadeOnScroll>
        </Flexer>
      )}
      {editableData.show_divider && (
        <div style={{ width: '90%' }}>
          <Divider color="minVisible" />
        </div>
      )}
    </Editable>
  );
};

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
