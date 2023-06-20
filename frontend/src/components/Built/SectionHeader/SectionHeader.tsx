import React, { useState } from 'react';

import { Flexer } from '@/components/Containers';

import { Divider, Text } from '@/components/Elements';

import { FadeOnScroll } from '@/components/Animation';
import { ButtonBar } from '../ButtonBar/ButtonBar';
import { colors } from '@/theme/common';
import { useEditModeStore } from '@/stores/editmode';
import { FormGenerator } from '@/features/editable/components/FormGenerator';

type AlignmentType = 'Left' | 'Right' | 'Center' | 'left' | 'right' | 'center';

export interface SectionHeaderContent {
  subtitle?: string;
  title?: string;
  description?: string;
  alignment: AlignmentType;
  showDivider?: boolean;
  name: string;
  id: string;
}

interface SectionHeaderProps {
  headerData: SectionHeaderContent;
  formTitle: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ headerData, formTitle }) => {
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

  const { editMode } = useEditModeStore();

  const [editing, setEditing] = useState(false);
  const [header, setHeader] = useState<SectionHeaderContent>(headerData);
  const alignClass = getAlignClass(headerData.alignment);

  const updateSectionHeader = (updatedHeader: SectionHeaderContent) => {
    setHeader(updatedHeader);
    setEditing(false);
  };

  return (
    <>
      {!editing ? (
        <>
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
                <Text t="h5" a={alignClass} s="0.95rem" fw="500" mb={16} w={500}>
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
        </>
      ) : (
        <Flexer j="c">
          <FadeOnScroll onScreenPercentage={0.1} animationDuration={0.5}>
            <FormGenerator
              title={formTitle}
              endpoint={`sectionheader/${header.name}/`}
              data={header}
              onUpdate={updateSectionHeader}
              handleCancel={() => setEditing(!editing)}
              width={325}
              excludeKeys={
                header.description
                  ? ['name', 'id', 'alignment', 'show_divider']
                  : ['name', 'id', 'alignment', 'show_divider', 'description']
              }
              multilineKeys={header.description ? ['description'] : ['']}
              px={3}
              py={3}
              placement="bottom"
              boxShadow
              br={8}
            />
          </FadeOnScroll>
        </Flexer>
      )}
      {editMode && !editing && (
        <ButtonBar
          justifyContent="center"
          editClick={() => setEditing(!editing)}
          adminLink="sectionheader"
          text="Section Header"
          mt={8}
        />
      )}
    </>
  );
};


