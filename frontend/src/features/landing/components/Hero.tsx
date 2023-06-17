import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Hero.css';

import { ButtonBar, ContactButtons, SocialButtons } from '@/components/Built';
import { Button } from '@/components/Buttons';
import { Flexer } from '@/components/Containers';
import { FormGenerator } from '@/components/Form';
import { BaseProps, Text } from '@/components/Elements';
import { palettes } from '@/utils';

import { HeroContent } from '../types';
import { useApp } from '@/hooks';

interface HeroProps extends BaseProps {
  data: HeroContent;
  contactData: any;
  socialsData: any;
}

export const Hero: React.FC<HeroProps> = ({ data, contactData, socialsData, ...rest }) => {
  const { editMode }: any = useApp();
  const [heroData, setHeroData] = useState(data);
  const [editing, setEditing] = useState(false);

  const updateHeroBlock = (updatedHeroBlock: any) => {
    setHeroData(updatedHeroBlock);
    setEditing(false);
  };

  return (
    <Flexer j="c" a="fs" className="hero-container" {...rest}>
      <Flexer fd="column" className="hero-overlay">
        {!editing ? (
          <Flexer fd="column" a="c" className="hero-header-root fade-in">
            <Text t="h1" a="c" className="hero-header-title">
              {heroData.title}
            </Text>
            <Text t="body1" a="c" className="hero-header-subtitle">
              {heroData.subtitle}
            </Text>
            <Text t="body1" fw="600" a="c" className="hero-header-description">
              {heroData.description}
            </Text>
            <Flexer j="c" a="c">
              <Link to="/services">
                <Button size="md" startIcon="launch" w={125}>
                  {heroData.buttonText}
                </Button>
              </Link>
            </Flexer>
            <ContactButtons contactData={contactData} borderRadius={4} />
            {editMode && (
              <ButtonBar
                justifyContent="center"
                editClick={() => setEditing(!editing)}
                adminLink="heroheader"
                text="Hero"
                tooltipPosition="bottom"
                mt={8}
              />
            )}
          </Flexer>
        ) : (
          <FormGenerator
            title="Edit Hero Header"
            endpoint="heroheader/main/"
            data={heroData}
            onUpdate={updateHeroBlock}
            handleCancel={() => setEditing(!editing)}
            width={325}
            excludeKeys={['name', 'id']}
            multilineKeys={['subtitle', 'description']}
            px={3}
            placement="bottom"
          />
        )}
        <Flexer j="c">
          <SocialButtons socialsData={socialsData} color="light" editMode={editMode} />
        </Flexer>
      </Flexer>
    </Flexer>
  );
};
