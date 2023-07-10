/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { useState, useEffect, useRef, ReactNode, CSSProperties } from 'react';
import { css } from '@emotion/react';
import clsx from 'clsx';

import { OptionProps } from '../Option/Option';
import { ExtendedTheme } from '../../../theme/types';
import { Base, BaseProps } from '../../../theme/base';
import { inject } from '../../../theme/utils';
import { Divider, HelpText, Icon, Text } from '../../Elements';

const styles = (theme: ExtendedTheme) => ({
  root: css({
    position: 'relative',
    display: 'inline-block',
    width: 200,
  }),
  selected: (dense: boolean) => ({
    padding: dense ? 4 : 8,
    border: '1px solid #ccc', // add to theme?
    borderRadius: 4,
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'background-color 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    '&:hover, &:focus': {
      backgroundColor: theme.light,
      border: `1px solid ${theme.primaryLight}`,
    },
  }),
  options: (visible: boolean) => ({
    display: visible ? 'block' : 'none',
    position: 'absolute',
    zIndex: 9999,
    top: '100%',
    left: 0,
    width: '100%',
    maxHeight: 200,
    border: '1px solid #ccc',
    backgroundColor: theme.light,
    boxShadow: theme.shadows[1],
    animation: theme.anim.fadeIn300,
    animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    animationFillMode: 'both',
    overflow: 'auto',
    scrollbarWidth: 'thin',
    scrollbarColor: '#ccc transparent',
  }),
});

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

export const Select: React.FC<SelectProps> = ({
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
  const css = inject(styles);
  const [selectedOption, setSelectedOption] = useState<string>(value || '');
  const [visible, setVisible] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setVisible(false);
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
    setVisible(!visible);
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
    <Base css={css.root} className={clsx(className)} ref={selectRef} style={style} {...rest}>
      {label && <HelpText>{label}</HelpText>}
      <div css={css.selected(dense)} onClick={handleToggleOptions}>
        {iconMixin && <Icon size="20px" icon={selectedOption} mr={12} />}
        <Text style={textStyle}>{selectedOption || '\u00A0'}</Text>
      </div>
      <div style={style}>
        <div css={css.options(visible)}>{options}</div>
      </div>
      <select
        css={{ display: 'none' }}
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
