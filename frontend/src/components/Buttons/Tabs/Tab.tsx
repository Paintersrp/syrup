import { FC, ReactEventHandler } from 'react';
import { css, useTheme } from '@emotion/react';

export const tabButtonCx = (active: boolean, theme: any) =>
  css({
    margin: '0px 4px 0px 4px',
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#ebebeb',
    color: '#333333',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    borderBottom: `3px solid ${active ? theme.primaryLight : theme.transparent}`,
    cursor: 'pointer',
    transition: 'border-bottom-color 0.3s ease',
    '&:hover': {
      borderBottomColor: theme.primaryLight,
    },
    '&.active': {
      color: theme.primaryLight,
      borderBottomColor: theme.primaryLight,
    },
    '&:first-child': {
      marginLeft: 0,
    },
  });

export interface TabProps {
  onClick: ReactEventHandler;
  text: string;
  active?: boolean;
}

export const Tab: FC<TabProps> = ({ onClick, text, active = false }) => {
  const theme = useTheme();
  return (
    <button css={tabButtonCx(active, theme)} onClick={onClick}>
      {text}
    </button>
  );
};
