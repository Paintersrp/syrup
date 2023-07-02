import { keyframes as kf } from '@emotion/react';
import { genAnimStyles } from '../utils';

export type AnimationKeyframe = keyof typeof keyframes;
export type AnimationStyleKey = `${AnimationKeyframe}${number}`;
export type AnimationStyles = { [key in AnimationStyleKey]: string };

export const keyframes = {
  enterRight: kf({
    '0%': {
      opacity: 0,
      transform: 'translateX(-100%)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateX(0)',
    },
  }),
  enterLeft: kf({
    '0%': {
      opacity: 0,
      transform: 'translateX(100%)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateX(0)',
    },
  }),
  fadeIn: kf({
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  }),
};

export const animations: AnimationStyles = Object.entries(keyframes).reduce(
  (result, [key, keyframe]) => {
    const generatedStyles = genAnimStyles(key, keyframe);
    return {
      ...result,
      ...generatedStyles,
    };
  },
  {} as AnimationStyles
);
