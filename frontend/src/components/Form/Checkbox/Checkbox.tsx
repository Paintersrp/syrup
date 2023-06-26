import { ChangeEventHandler, CSSProperties, FC } from 'react';
import { css } from '@emotion/react';

import { HelpText } from '@/components/Elements';
import { Icon } from '@/components/Media';
import { inject } from '@/theme/utils';

const styles = (theme: any) => ({
  checkbox: css({
    display: 'flex',
    fontSize: 14,
    color: theme.dark,
    width: '100%',
  }),
  input: css({
    opacity: 0,
    position: 'absolute',
    cursor: 'pointer',
  }),
  checkmark: (checked: boolean) =>
    css({
      height: 16,
      width: '100%',
      maxWidth: 16,
      borderRadius: 4,
      border: '1px solid #cccccc',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      backgroundColor: checked ? theme.primary : undefined,
      borderColor: checked ? theme.primary : undefined,
      ...theme.flex.cc,
    }),
});

interface CheckboxProps {
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  name?: string;
  label?: string;
  style?: CSSProperties;
  mt?: CSSProperties['marginTop'];
  mb?: CSSProperties['marginBottom'];
  invert?: boolean;
}

export const Checkbox: FC<CheckboxProps> = ({
  checked,
  onChange,
  name,
  label,
  style,
  mt: marginTop = 0,
  mb: marginBottom = 0,
  invert = false,
}) => {
  const css = inject(styles);

  const rootStyle = { ...style, marginTop: marginTop, marginBottom: marginBottom };
  const checkmarkStyle = {
    order: invert ? 2 : 1,
    marginRight: !label ? 0 : invert ? 0 : 8,
    marginLeft: !label ? 0 : invert ? 8 : 0,
  };

  return (
    <label css={css.checkbox} style={rootStyle}>
      <input type="checkbox" checked={checked} onChange={onChange} css={css.input} name={name} />
      <span css={css.checkmark(checked)} style={checkmarkStyle}>
        {checked && <Icon icon="check" size="1rem" color="#f5f5f5" />}
      </span>
      {label && (
        <HelpText w="auto" a={invert ? 'r' : 'l'} mt={0} mb={0} style={{ order: invert ? 1 : 2 }}>
          {label}
        </HelpText>
      )}
    </label>
  );
};
