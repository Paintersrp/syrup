import { FC } from 'react';
import { css } from '@emotion/react';

import { ContactButtons, SocialButtons } from '@/components/Built';
import { Button } from '@/components/Buttons';
import { Flexer } from '@/components/Containers';
import { Link, Text } from '@/components/Elements';
import { Editable, useEditable } from '@/features/editable';
import { useBreakpoint } from '@/hooks';
import { BaseProps } from '@/theme/base';
import { ExtendedTheme } from '@/theme/types';
import { inject } from '@/theme/utils';

import { HeroContent } from '../types';

const styles = (theme: ExtendedTheme) => ({
  root: css({
    height: '100%',
    background: 'url(https://source.unsplash.com/1400x900/?service) no-repeat center center fixed',
    backgroundSize: 'cover',
    maxWidth: '100%',
    minHeight: 700,
  }),
  overlay: css({
    padding: '16px 0 8px 0',
    backgroundColor: 'rgba(22, 22, 22, 0.6)',
    marginTop: 60,
  }),
  title: css({
    textTransform: 'uppercase',
    color: theme.secondary,
    fontWeight: 700,
  }),
  description: css({
    color: '#cccccc',
    maxWidth: 500,
    fontSize: '0.9rem',
    marginBottom: 16,
  }),
});

interface HeroProps extends BaseProps {
  data: HeroContent;
  contactData: any;
  socialsData: any;
}

export const Hero: FC<HeroProps> = ({ data, contactData, socialsData, ...rest }) => {
  const css = inject(styles);
  const isLargeScreen = useBreakpoint('lg');

  const [editableData, editConfig] = useEditable({
    name: 'hero',
    endpoint: 'heroheader/main/',
    data: data,
    editMenuAlign: 'center',
    multilineKeys: ['subtitle'],
    excludeKeys: ['name'],
    formSettings: {
      width: isLargeScreen ? '85%' : '40%',
      px: 3,
      py: 1.5,
    },
  });

  return (
    <Flexer j="c" a="fs" css={css.root} {...rest}>
      <Flexer fd="column" css={css.overlay}>
        <Editable {...editConfig}>
          <Flexer fd="column" a="c" className="fade-in">
            <Text t="h1" a="c" css={css.title} mb={8}>
              {editableData.title}
            </Text>
            <Text t="h4" a="c" c="light" s="1.4rem">
              {editableData.subtitle}
            </Text>
            <Text fw="600" a="c" s="1rem" css={css.description}>
              {editableData.description}
            </Text>
            <Flexer j="c" a="c">
              <Link to="/services">
                <Button size="md" startIcon="launch" w={125}>
                  {editableData.buttonText}
                </Button>
              </Link>
            </Flexer>
            <ContactButtons contactData={contactData} borderRadius={4} />
          </Flexer>
        </Editable>
        <Flexer j="c">
          <SocialButtons socialsData={socialsData} />
        </Flexer>
      </Flexer>
    </Flexer>
  );
};
