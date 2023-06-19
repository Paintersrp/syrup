import React, { useState } from 'react';
import { HelpText } from '../../Elements';
import { Base, BaseProps } from '@/theme/base';
import './Switch.css';

interface SwitchProps extends BaseProps {
  name: string;
  label?: string;
  value: boolean;
  onChange: any;
  size?: 'small' | 'medium' | 'large';
}

const Switch: React.FC<SwitchProps> = ({
  name,
  label,
  value,
  onChange,
  size = 'small',
  ...rest
}) => {
  const [isChecked, setIsChecked] = useState(value);

  const handleToggle = (e: any) => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange({
      target: {
        name,
        checked: newValue,
      },
    });
  };

  const switchSizeClass = `switch ${isChecked ? 'on' : 'off'} ${size}`;

  return (
    <Base className={`switch-container ${size}`} {...rest}>
      {label && (
        <HelpText w="auto" mt={0} mb={0}>
          {label}
        </HelpText>
      )}
      <div className={switchSizeClass} onClick={handleToggle}>
        <input
          type="checkbox"
          name={name}
          checked={isChecked}
          onChange={handleToggle}
          className="switch-input"
        />
        <span className="slider" />
      </div>
    </Base>
  );
};

export default Switch;
