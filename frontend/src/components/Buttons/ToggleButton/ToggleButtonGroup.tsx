import React, { useState, ReactNode, CSSProperties } from 'react';
import './ToggleButtonGroup.css';

import { Base, BaseProps } from '../../Elements';

interface ToggleButtonGroupProps extends BaseProps {
  value: string | null;
  onChange: (value: string | null) => void;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  mt?: CSSProperties['marginTop'];
  mb?: CSSProperties['marginBottom'];
}

const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = ({
  value,
  onChange,
  children,
  style,
  className,
  ...rest
}) => {
  const [selectedButton, setSelectedButton] = useState<number | null>(null);

  const handleButtonClick = (index: number, childValue: string | null) => {
    const newValue = index === selectedButton ? null : childValue;
    setSelectedButton(newValue === value ? null : index);
    onChange(childValue);
  };

  const childrenCount = React.Children.count(children);
  const hasOnlyTwoChildren = childrenCount === 2;

  return (
    <Base className={`toggle-button-group ${className}`} style={style} {...rest}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
          return null;
        }

        const childValue = child.props.value;
        const isSelected = childValue === value;
        const buttonClasses = `${isSelected ? 'active' : ''} ${
          hasOnlyTwoChildren && index === childrenCount - 1 ? 'toggle-button-border-left' : ''
        }`;
        return React.cloneElement(child, {
          onClick: () => handleButtonClick(index, childValue),
          className: buttonClasses,
        } as React.DOMAttributes<HTMLButtonElement>);
      })}
    </Base>
  );
};

export default ToggleButtonGroup;
