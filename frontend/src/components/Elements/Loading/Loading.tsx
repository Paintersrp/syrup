import { FC, useEffect } from 'react';
import { css, keyframes } from '@emotion/react';

import { Flexer } from '@/components/Containers';
import { Icon } from '@/components/Media';
import { ExtendedTheme } from '@/theme/types';
import { inject } from '@/theme/utils';

const kf = {
  spinnerRotate: keyframes({
    '100%': {
      transform: 'rotate(360deg)',
    },
  }),
  spinnerProgress: keyframes({
    '0%': {
      transform: 'rotate(0deg)',
    },
    '50%': {
      transform: 'rotate(180deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  }),
  pulseDots: keyframes({
    '0%': {
      transform: 'scale(0.8)',
    },
    '50%': {
      transform: 'scale(1)',
    },
    '100%': {
      transform: 'scale(0.8)',
    },
  }),
};

const styles = (theme: ExtendedTheme) => ({
  overlay: (active: boolean) =>
    css({
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: active ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 1)',
      zIndex: 99999,
    }),
  spinner: css({
    position: 'absolute',
    width: 90,
    height: 90,
    ...theme.flex('c', 'c'),
    animation: `${kf.spinnerRotate} 2s infinite linear`,
  }),
  progress: css({
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: '50%',
    border: `4px solid ${theme.secondary}`,
    borderTopColor: 'transparent',
    width: 90,
    height: 90,
    ...theme.flex('c', 'c'),
    animation: `${kf.spinnerProgress} 2s infinite linear`,
  }),
  dotIcon: (index: number) =>
    css({
      animation: `${kf.pulseDots} 2s infinite linear`,
      animationDelay: `${index * 0.4}s`,
    }),
});

interface LoadingProps {
  load: boolean;
}

export const Loading: FC<LoadingProps> = ({ load }) => {
  const css = inject(styles);

  useEffect(() => {
    const rootElement = document.documentElement;
    if (load) {
      rootElement.style.overflow = 'hidden';
    } else {
      rootElement.style.overflow = '';
    }
    return () => {
      rootElement.style.overflow = '';
    };
  }, [load]);

  return (
    <div css={css.overlay(load)}>
      <div css={css.spinner}>
        <div css={css.progress}></div>
      </div>
      <Flexer j="c" a="c">
        {[1, 2, 3].map((index) => (
          <Icon key={`dot-${index}`} icon="circle" css={css.dotIcon(index)} color="secondary" />
        ))}
      </Flexer>
    </div>
  );
};
