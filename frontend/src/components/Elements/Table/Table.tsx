import { ReactNode, CSSProperties, FC } from 'react';
import { css, useTheme } from '@emotion/react';
import { lighten } from 'polished';
import clsx from 'clsx';

import { Text } from '@/components/Elements';
import { Base, BaseProps } from '@/theme/base';

const tablePadding: any = {
  small: '2px',
  medium: '4px',
  large: '8px',
  xlarge: '12px',
};

const styles = {
  table: (theme: any, size: string) =>
    css({
      width: '100%',
      borderCollapse: 'collapse',
      'th, td': {
        padding: tablePadding[size],
      },
      'tr, td': {
        backgroundColor: theme.light,
      },
    }),
  cell: (theme: any) =>
    css({
      backgroundColor: theme.light,
      borderBottom: `1px solid ${theme.minVisible}`,
      borderRight: `1px solid ${theme.minVisible}`,
      color: '#333333',
      transition: 'background-color 0.1s ease',
      '&:first-of-type': {
        borderLeft: 'none',
      },
      '&:last-of-type': {
        borderRight: 'none',
      },
      '&:hover': {
        backgroundColor: lighten(0.015, theme.light),
      },
      '@media (max-width: 768px)': {
        td: {
          padding: tablePadding.medium,
        },
      },
    }),
};

type SharedTableProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

type TableContainerProps = SharedTableProps & BaseProps;

const TableContainer: FC<TableContainerProps> = ({ children, className, style, ...rest }) => {
  return (
    <Base css={{ overflow: 'hidden' }} className={clsx(className)} style={style} {...rest}>
      {children}
    </Base>
  );
};

export type TableSizes = 'small' | 'medium' | 'large' | 'xlarge';

type TableProps = SharedTableProps & {
  size?: TableSizes;
};

const Table: FC<TableProps> = ({ children, className, style, size = 'medium' }) => {
  const theme = useTheme();
  return (
    <table css={styles.table(theme, size)} className={clsx(className)} style={style}>
      {children}
    </table>
  );
};

const TableHead: FC<SharedTableProps> = ({ children, className, style }) => {
  return (
    <thead className={clsx(className)} style={style}>
      {children}
    </thead>
  );
};

const TableRow: FC<SharedTableProps> = ({ children, className, style }) => {
  return (
    <tr className={clsx(className)} style={style}>
      {children}
    </tr>
  );
};

const TableBody: FC<SharedTableProps> = ({ children, className, style }) => {
  return (
    <tbody className={clsx(className)} style={style}>
      {children}
    </tbody>
  );
};

type TableCellProps = SharedTableProps & {
  a?: 'left' | 'center' | 'right';
  fw?: CSSProperties['fontWeight'];
  s?: CSSProperties['fontSize'];
};

const TableCell: FC<TableCellProps> = ({
  children,
  a: align = 'left',
  className,
  style,
  fw: fontWeight = 'normal',
  s: fontSize,
}) => {
  const theme = useTheme();
  const cellStyle: CSSProperties = {
    ...style,
  };

  return (
    <td css={styles.cell(theme)} className={clsx(className)} style={cellStyle}>
      <Text a={align} fw={fontWeight} s={fontSize}>
        {children}
      </Text>
    </td>
  );
};

export { Table, TableContainer, TableHead, TableRow, TableCell, TableBody };
