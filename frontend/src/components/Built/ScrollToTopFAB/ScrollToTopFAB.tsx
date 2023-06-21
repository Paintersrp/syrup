import { FC, Fragment, useEffect, useState } from 'react';
import { css, keyframes } from '@emotion/react';

import { FAB } from '@/components/Buttons';
import { scrollToTop } from '@/utils';

interface ScrollToTopFABProps {}

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOutAnimation = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
`;

export const cx = {
  fadeInFab: css({
    animation: `${fadeInAnimation} 0.3s ease-in`,
  }),
  fadeOutFab: css({
    animation: `${fadeOutAnimation} 0.3s ease-out`,
  }),
  fabAnimate: css({
    animationFillMode: 'both',
  }),
};

export const ScrollToTopFAB: FC<ScrollToTopFABProps> = () => {
  const [animateTrigger, setAnimateTrigger] = useState(false);
  const [hideFab, setHideFab] = useState(false);

  useEffect(() => {
    let prevShowFab = false;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      const shouldShowFab = currentScrollY > 150;

      if (shouldShowFab !== prevShowFab) {
        prevShowFab = shouldShowFab;

        if (!shouldShowFab) {
          setAnimateTrigger(true);
          setTimeout(() => {
            setHideFab(true);
            setAnimateTrigger(false);
          }, 300); // Duration of fade-out animation (0.3s)
        } else {
          setHideFab(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    scrollToTop();
  };

  return (
    <Fragment>
      {!hideFab && (
        <FAB
          aria-label="menu"
          onClick={handleClick}
          icon="arrow_upward"
          size="20px"
          css={[
            cx.fabAnimate,
            animateTrigger ? cx.fadeOutFab : cx.fadeInFab,
          ]}
          tooltip="Scroll to Top"
        />
      )}
    </Fragment>
  );
};
