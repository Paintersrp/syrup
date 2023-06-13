import { FC } from 'react';
import './Radio.css';

export interface RadioProps {
  label: string;
  value: any;
  checked?: boolean;
  onChange?: (value: any) => void;
}

export const Radio: FC<RadioProps> = ({ label, value, checked, onChange }) => {
  const handleRadioChange = () => {
    if (onChange) onChange(value);
  };

  return (
    <label className="radio-container">
      <input type="radio" value={value} checked={checked} onChange={handleRadioChange} />
      <span className="radio-checkmark"></span>
      <span className="radio-label">{label}</span>
    </label>
  );
};
