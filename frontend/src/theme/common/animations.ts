import { keyframes } from '@emotion/react';
import { genAnimStyles } from '../utils';

export type AnimationKeyframe = keyof typeof keyframeCx;
export type AnimationStyleKey = `${AnimationKeyframe}${number}`;
export type AnimationStyles = { [key in AnimationStyleKey]: string };

export const keyframeCx = {
  enterRight: keyframes({
    '0%': {
      opacity: 0,
      transform: 'translateX(-100%)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateX(0)',
    },
  }),
  enterLeft: keyframes({
    '0%': {
      opacity: 0,
      transform: 'translateX(100%)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateX(0)',
    },
  }),
  fadeIn: keyframes({
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  }),
};

export const animations: AnimationStyles = Object.entries(keyframeCx).reduce(
  (result, [key, keyframe]) => {
    const generatedStyles = genAnimStyles(key, keyframe);
    return {
      ...result,
      ...generatedStyles,
    };
  },
  {} as AnimationStyles
);
