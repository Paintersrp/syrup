import {
  useState,
  ReactNode,
  CSSProperties,
  FC,
  Children,
  isValidElement,
  cloneElement,
  DOMAttributes,
} from 'react';
import clsx from 'clsx';

import { Base, BaseProps } from '@/theme/base';
import { css, useTheme } from '@emotion/react';

export const cx: any = {
  borderLeft: css({
    borderLeft: '1px solid #ccc',
  }),
  active: (theme: any) =>
    css({
      backgroundColor: theme.primary,
      color: '#fff',
    }),
};

interface ToggleButtonGroupProps extends BaseProps {
  value: string | null;
  onChange: (value: string | null) => void;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  mt?: CSSProperties['marginTop'];
  mb?: CSSProperties['marginBottom'];
}

export const ToggleButtonGroup: FC<ToggleButtonGroupProps> = ({
  value,
  onChange,
  children,
  style,
  className,
  ...rest
}) => {
  const theme = useTheme();
  const [selectedButton, setSelectedButton] = useState<number | null>(null);

  const handleButtonClick = (index: number, childValue: string | null) => {
    const newValue = index === selectedButton ? null : childValue;
    setSelectedButton(newValue === value ? null : index);
    onChange(childValue);
  };

  const childrenCount = Children.count(children);
  const hasOnlyTwoChildren = childrenCount === 2;

  return (
    <Base d="flex" className={clsx(className)} style={style} {...rest}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) {
          return null;
        }

        const childValue = child.props.value;
        const isSelected = childValue === value;

        return cloneElement(child, {
          onClick: () => handleButtonClick(index, childValue),
          active: isSelected,
        } as DOMAttributes<HTMLButtonElement>);
      })}
    </Base>
  );
};
