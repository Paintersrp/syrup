/** @jsx jsx */
import { jsx } from '@emotion/react';
import { keyframes as kf, SerializedStyles } from '@emotion/react';

/**
 * Represents the keyframes for different animations.
 */
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

export type AnimationKeyframe = keyof typeof keyframes;
export type AnimationStyleKey = `${AnimationKeyframe}${number}`;
export type AnimationStyles = { [key in AnimationStyleKey]: string };
export type GenAnimStylesFn = (
  baseName: string,
  animationKeyframe: SerializedStyles
) => AnimationStyles;

/**
 * Generates animation styles for different durations based on a base name and animation keyframe.
 *
 * @param baseName - The base name for the animation style.
 * @param animationKeyframe - The keyframe for the animation.
 * @returns The generated animation styles as an object.
 *
 * @example
 * // Generate animation styles for "enterRight" keyframe and base name "slide":
 * const animationStyles = genAnimStyles("slide", keyframes.enterRight);
 *  Output:
 *  {
 *    slide300: "enterRight 300ms ease-in-out",
 *    slide500: "enterRight 500ms ease-in-out",
 *    slide1000: "enterRight 1000ms ease-in-out",
 *    slide1500: "enterRight 1500ms ease-in-out",
 *    slide2000: "enterRight 2000ms ease-in-out",
 *    slide2500: "enterRight 2500ms ease-in-out",
 *  }
 */
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

/**
 * Represents a collection of animation styles generated from keyframes.
 */
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
