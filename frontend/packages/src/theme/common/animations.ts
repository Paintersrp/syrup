import { keyframes as kf, SerializedStyles } from '@emotion/react';

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

// Generates a set of animation classes based on the passed in name / keyframe animations
// baseName = enterLeft, animationKeyframe = *emotion keyframes here*
// results in:
// enterLeft300
// enterLeft500
// enterLeft1000
// enterLeft1500
// enterLeft2000
// enterLeft2500
// Add more durations to generate more classes, or remove for less
type GenAnimStylesFn = (baseName: string, animationKeyframe: SerializedStyles) => AnimationStyles;

export const genAnimStyles: GenAnimStylesFn = (baseName, animationKeyframe) => {
  const animationClasses: AnimationStyles = {} as AnimationStyles;
  const durations: number[] = [300, 500, 1000, 1500, 2000, 2500];

  durations.forEach((duration) => {
    const className = `${baseName}${duration}` as AnimationStyleKey;
    const animation = `${animationKeyframe} ${duration}ms ease-in-out`;
    animationClasses[className] = animation;
  });

  return animationClasses;
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
