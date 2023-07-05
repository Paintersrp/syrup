import { SerializedStyles } from '@emotion/react';
import { AnimationStyleKey, AnimationStyles } from '../common';

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
