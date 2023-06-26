import { FC, useState } from 'react';
import { css, keyframes } from '@emotion/react';

import { BrandButton } from '@/components/Buttons';
import { Link } from '@/components/Elements';
import { SOCIALS } from '@/settings';
import { Base, BaseProps } from '@/theme/base';
import { ExtendedTheme } from '@/theme/types';
import { inject } from '@/theme/utils';
import { SocialContent } from '@/types';

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
      ...theme.flex.cc,
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
