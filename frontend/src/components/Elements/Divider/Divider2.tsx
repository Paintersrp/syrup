import { FC } from 'react';
import styled, { CSSObject, css } from 'styled-components';

import { Flexer } from '@/components/Containers';
import Text from '../Text/Text';

// This approach to css in js uses styled components
// Essentially, each part of your component is defined as a styled element
// such as this root container for the divider:
const DividerRoot = styled.div`
  width: 100%;
`;
// When used in your component, a <DividerRoot /> is just a div with the css defined applied to it

// Here is a slightly more complex example that takes in props.
// Props are passed by using this styled(Text) component as follows:
//      <DividerText {...props} /> which simply passes all props to it (scroll down to see)
// Just like before, the css is applied after the ` opening and then closed with the `
const DividerText = styled(Text)<DividerProps>`
  // An example of loading props, this just loads textSize which is a prop passed to it
  // It starts by dynamically loading textSize with ({ textSize })
  // then => leads to the definition, which checks if textSize is defined and applies it if it is
  // so once this css is applied, if textSize is 18 this would read font-size: 18px
  // textSize ?? 14 just means if there's no textSize, use 14 as a default.
  font-size: ${({ textSize }) => `${textSize ?? 14}px`};

  // More examples, same usecase
  color: ${({ textColor }) => textColor ?? '#222'};
  margin: 0px 10px;
`;

const DividerTextNoComments = styled(Text)<DividerProps>`
  font-size: ${({ textSize }) => `${textSize ?? 14}px`};
  color: ${({ textColor }) => textColor ?? '#222'};
  margin: 0px 10px;
`;

// Here is a more complex example which takes in props to dynamically define the css
// *There's an uncommented example below for comparison purposes*
const DividerLine = styled.hr<DividerProps>`
  flex-grow: 1;
  border: none;
  margin-bottom: ${({ mb }) => (mb ? `${mb}px` : '')};
  margin-top: ${({ mt }) => (mt ? `${mt}px` : '')};
  margin-right: ${({ mr }) => (mr ? `${mr}px` : '')};
  margin-left: ${({ ml }) => (ml ? `${ml}px` : '')};

  // A more advanced example that takes in a few props to set the thickness of the borderTop
  // as well as if it's a solid or dashed line and setting the color
  // The below definition looks a little different than ({ mb })
  // ({ thick = 1, dashed = false, color = 'rgba(0, 0, 0, 0.1)' })
  // Using thick = 1 instead of just thick applies 1 as the default if no prop is passed

  // The end result of this definition might look like:
  // border-top: 1px solid "rgba(0,0,0,0.1)"
  // border-top: 2px dashed #ffffff
  border-top: ${({ thick = 1, dashed = false, color = 'rgba(0, 0, 0, 0.1)' }) =>
    `${thick}px ${dashed ? 'dashed' : 'solid'} ${color}`};

  // How dynamic hover classes might be handled within this system
  ${({ color }) =>
    css`
      &:hover {
        border-top: 2px solid ${color};
      }
    `}
`;

const DividerLineNoComments = styled.hr<DividerProps>`
  flex-grow: 1;
  border: none;
  margin-bottom: ${({ mb }) => (mb ? `${mb}px` : '')};
  margin-top: ${({ mt }) => (mt ? `${mt}px` : '')};
  margin-right: ${({ mr }) => (mr ? `${mr}px` : '')};
  margin-left: ${({ ml }) => (ml ? `${ml}px` : '')};
  border-top: ${({ thick = 1, dashed = false, color = 'rgba(0, 0, 0, 0.1)' }) =>
    `${thick}px ${dashed ? 'dashed' : 'solid'} ${color}`};

  ${({ color }) =>
    css`
      &:hover {
        border-top: 2px solid ${color};
      }
    `}
`;

interface DividerProps {
  mb?: number;
  mt?: number;
  mr?: number;
  ml?: number;
  color?: string;
  thick?: number;
  dashed?: boolean;
  text?: string;
  textColor?: string;
  textSize?: number;
  style?: CSSObject;
  className?: string;
}

export const Divider2: FC<DividerProps> = ({
  mb,
  mt,
  mr,
  ml,
  color,
  thick,
  dashed,
  text,
  textColor,
  textSize,
  style,
  className,
}) => {
  const dividerProps = { mb, mt, mr, ml, color, thick, dashed };
  const textProps = { textColor, textSize };

  return (
    <DividerRoot style={style} className={className}>
      {!text && <DividerLine {...dividerProps} />}
      {text && (
        <Flexer a="c">
          <DividerLine {...dividerProps} />
          <DividerText fw="400" w="auto" {...textProps}>
            {text}
          </DividerText>
          <DividerLine {...dividerProps} />
        </Flexer>
      )}
    </DividerRoot>
  );
};
