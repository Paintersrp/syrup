import { FC, useState } from 'react';
import { css, keyframes } from '@emotion/react';

import { SocialContent } from '@/types';
import { ExtendedTheme } from '@/theme/types';
import { Base, BaseProps, BrandButton, Link } from 'sy-core';
import { inject } from '@/theme/utils/inject';
import { SOCIALS } from '@/settings';

export const anim = {
  scroll: keyframes({
    '0%': {
      transform: 'translateX(0)',
    },
    '25%': {
      transform: 'translateX(-25%)',
    },
    '50%': {
      transform: 'translateX(-50%)',
    },
    '75%': {
      transform: 'translateX(-25%)',
    },
    '100%': {
      transform: 'translateX(0)',
    },
  }),
};

const styles = (theme: ExtendedTheme) => ({
  container: css({
    overflow: 'hidden',
  }),
  wrapper: (isScrolling: boolean) =>
    css({
      width: '400%',
      minHeight: 60,
      animation: `${anim.scroll} 150s linear infinite`,
      animationPlayState: isScrolling ? 'running' : 'paused',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // ...theme.flex('c', 'c'),
    }),
  icon: css({
    width: '25%',
    display: 'inline-block',
    transition: 'all 0.3s ease',
  }),
});

export const IconScroller: FC<BaseProps> = ({ ...rest }) => {
  const css = inject(styles);

  const duplicatedPartners: SocialContent[] = [...SOCIALS, ...SOCIALS, ...SOCIALS];
  const [isScrolling, setIsScrolling] = useState<boolean>(true);

  return (
    <Base w="100%" pb={64} {...rest}>
      <div
        css={css.container}
        onMouseEnter={() => setIsScrolling(false)}
        onMouseLeave={() => setIsScrolling(true)}
      >
        <div css={css.wrapper(isScrolling)}>
          {duplicatedPartners.map((social: SocialContent, index: number) => (
            <div key={`${social.name}-${index}`} css={css.icon}>
              <Link to={`https://www.${social.name}.com/${social.handle}`}>
                <BrandButton
                  icon={social.icon}
                  fontSize="2rem"
                  palette="primary"
                  variant="hover"
                  size="lg"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
};
