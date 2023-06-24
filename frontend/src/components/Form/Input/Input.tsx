import { useState, ChangeEvent, CSSProperties, FC } from 'react';
import { css } from '@emotion/react';

import { HelpText } from '@/components/Elements';
import { Base, BaseProps } from '@/theme/base';
import { inject } from '@/theme/utils';

const sizeMapping: any = {
  small: 2,
  medium: 4,
  large: 8,
  xlarge: 12,
};

const styles = (theme: any) => ({
  root: css({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  }),
  input: (size: string, error: boolean, disabled: boolean, textarea: boolean) =>
    css({
      width: '100%',
      fontSize: '0.9rem',
      lineHeight: 1.5,
      color: '#495057',
      backgroundColor: disabled ? '#e9ecef' : theme.light,
      backgroundClip: 'padding-box',
      border: '1px solid #ced4da',
      borderRadius: 4,
      transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
      fontWeight: 500,
      borderColor: error ? theme.error : undefined,
      opacity: disabled ? 0.65 : 1,
      pointerEvents: disabled ? 'none' : undefined,
      resize: textarea ? 'vertical' : 'none',
      padding: `${sizeMapping[size]}px`,
      paddingLeft: 6,

      '&:focus': {
        borderColor: theme.primaryLight,
        outline: 0,
        boxShadow: `0 0 0.005rem ${theme.primaryLight}`,
      },
    }),
});

interface InputProps extends BaseProps {
  id?: string;
  name?: string;
  type?: string;
  helpText?: string;
  helpPosition?: 'top' | 'bottom';
  value?: string | number | undefined;
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  rows?: number;
  multiline?: boolean;
  required?: boolean;
  error?: boolean;
  placeholder?: string;
  style?: CSSProperties;
  inputStyle?: CSSProperties;
  className?: string;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
}

export const Input: FC<InputProps> = ({
  id,
  name,
  type = 'text',
  helpText = '',
  helpPosition = 'top',
  value,
  onChange,
  rows = 4,
  multiline = false,
  required = false,
  error = false,
  placeholder,
  style,
  inputStyle,
  className = '',
  size = 'large',
  disabled = false,
  ...rest
}) => {
  const css = inject(styles);
  const [focused, setFocused] = useState<boolean>(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const InputComponent = multiline ? 'textarea' : 'input';

  const inputStyles = {
    ...inputStyle,
    minHeight: multiline ? 30 * rows : undefined,
    order: helpPosition === 'top' ? 2 : 1,
  };

  return (
    <Base css={css.root} style={style} {...rest}>
      {helpText && (
        <HelpText mt={0} mb={0} style={{ order: helpPosition === 'top' ? 1 : 2 }}>
          {helpText}
        </HelpText>
      )}
      <InputComponent
        css={css.input(size, error, disabled, multiline)}
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        required={required}
        type={type}
        data-error={error ? 'true' : undefined}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={inputStyles}
      />
    </Base>
  );
};
