import React, { CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import './Checkbox.css';

import { HelpText } from '../../Elements';

interface CheckboxProps {
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  name?: string;
  label?: string;
  style?: CSSProperties;
  mt?: CSSProperties['marginTop'];
  mb?: CSSProperties['marginBottom'];
  invert?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  name,
  label,
  style,
  mt: marginTop = 0,
  mb: marginBottom = 0,
  invert = false,
}) => {
  return (
    <label
      className="checkbox"
      style={{ ...style, marginTop: marginTop, marginBottom: marginBottom }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="checkbox__input"
        name={name}
      />
      <span
        className="checkbox__checkmark"
        style={{
          order: invert ? 2 : 1,
          marginRight: !label ? 0 : invert ? 0 : 8,
          marginLeft: !label ? 0 : invert ? 8 : 0,
        }}
      >
        {checked && <FontAwesomeIcon icon={faCheck} />}
      </span>
      {label && (
        <HelpText a={invert ? 'r' : 'l'} mt={0} mb={0} style={{ order: invert ? 1 : 2 }}>
          {label}
        </HelpText>
      )}
    </label>
  );
};

export default Checkbox;
