import React, { useState, useEffect, useRef, ReactNode, CSSProperties } from 'react';
import './Select.css';

import { Divider, HelpText, Text } from '../../Elements';
import { Base, BaseProps } from '@/theme/base';
import { OptionProps } from '../Option/Option';
import { Icon } from '../../Media';

interface SelectProps extends BaseProps {
  children: ReactNode;
  onChange?: (event: any) => void;
  dividers?: boolean;
  label?: string;
  name?: string;
  style?: CSSProperties;
  textStyle?: CSSProperties;
  className?: string;
  iconMixin?: boolean;
  value?: any;
  dense?: boolean;
}

const Select: React.FC<SelectProps> = ({
  children,
  onChange,
  dividers = true,
  label,
  name,
  style,
  textStyle = { paddingLeft: 4 },
  className,
  iconMixin = false,
  value,
  dense,
  ...rest
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(value || '');
  const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOptionsVisible(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    const syntheticEvent = {
      target: {
        value: selectedValue,
        name: name,
      },
    } as React.ChangeEvent<HTMLSelectElement>;

    if (onChange) {
      onChange(syntheticEvent);
    }
  };

  const handleToggleOptions = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };

  const options = React.Children.map(children, (child, index) => {
    const shouldRenderDivider = dividers && index !== 0;

    if (React.isValidElement<OptionProps>(child) && child.props.value) {
      const syntheticEvent = {
        target: { value: child.props.value },
      } as React.ChangeEvent<HTMLSelectElement>;

      return (
        <React.Fragment>
          {shouldRenderDivider && <Divider />}
          {React.cloneElement(child, {
            isSelected: selectedOption === child.props.value,
            onClick: () => {
              handleSelectChange(syntheticEvent);
              handleToggleOptions();
            },
          })}
        </React.Fragment>
      );
    }

    return null;
  });

  return (
    <Base className={`select ${className}`} ref={selectRef} style={style} {...rest}>
      {label && <HelpText>{label}</HelpText>}
      <div
        className={dense ? 'selected-option-dense' : 'selected-option'}
        onClick={handleToggleOptions}
      >
        {iconMixin && <Icon size="20px" icon={selectedOption} mr={12} />}
        <Text style={textStyle}>{selectedOption || '\u00A0'}</Text>
      </div>
      <div style={style}>
        <div className={`options ${isOptionsVisible ? 'visible' : ''}`}>{options}</div>
      </div>
      <select
        className="hidden-select"
        value={selectedOption}
        onChange={handleSelectChange}
        onClick={handleToggleOptions}
        name={name}
      >
        <option value="" disabled hidden></option>
        {children}
      </select>
    </Base>
  );
};

export default Select;
