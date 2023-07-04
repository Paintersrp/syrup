import { Children, cloneElement, CSSProperties, FC, isValidElement, ReactElement } from 'react';

import { Base, BaseProps } from '@/theme/base';
import { RadioProps } from './Radio';

interface RadioGroupProps extends BaseProps {
  value: any;
  onChange: (value: string) => void;
  children: ReactElement<RadioProps>[];
  style?: CSSProperties;
  className?: string;
}

export const RadioGroup: FC<RadioGroupProps> = ({
  value,
  onChange,
  children,
  style,
  className,
  ...rest
}) => {
  const handleRadioChange = (selectedValue: string) => {
    onChange(selectedValue);
  };

  return (
    <Base d="flex" fd="column" a="c" style={style} className={className} {...rest}>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            checked: child.props.value === value,
            onChange: handleRadioChange,
          }) as ReactElement<RadioProps>;
        }
        return child;
      })}
    </Base>
  );
};
