import React, { useState } from 'react';
import './SectionHeader.css';

import { palettes } from '@/utils';
import { Flexer } from '@/components/Containers';

import { Divider, Text } from '@/components/Elements';
import { FormGenerator } from '@/components/Form';
import { FadeOnScroll } from '@/components/Animation';
import ButtonBar from '../ButtonBar/ButtonBar';

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
  editMode: boolean;
  formTitle: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ headerData, editMode, formTitle }) => {
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

  console.log(headerData.alignment);
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
                <Text t="subtitle1" a="c" className="section-header-subtitle">
                  {header.subtitle}
                </Text>
              </FadeOnScroll>
            )}

            {header.title && (
              <FadeOnScroll onScreenPercentage={0.1} animationDuration={1.5}>
                <Text t="h2" a={alignClass} className="section-header-title">
                  {header.title}
                </Text>
              </FadeOnScroll>
            )}
          </Flexer>

          {header.description && (
            <Flexer fd="column">
              <FadeOnScroll onScreenPercentage={0.1} animationDuration={2.5}>
                <Text t="h5" a={alignClass} className="section-header-description">
                  {header.description}
                </Text>
              </FadeOnScroll>
            </Flexer>
          )}
          {header.showDivider && (
            <div style={{ width: '90%' }}>
              <Divider color={palettes.text.min} />
            </div>
          )}
        </>
      ) : (
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
          />
        </FadeOnScroll>
      )}
      {editMode && !editing && (
        <ButtonBar
          justifyContent="center"
          editClick={() => setEditing(!editing)}
          adminLink="sectionheader"
          text="Section Header"
          tooltipPosition="bottom"
          mt={8}
        />
      )}
    </>
  );
};

export default SectionHeader;
