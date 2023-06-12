import React, { ReactNode, CSSProperties } from 'react';
import './Table.css';

import Text from '../Text/Text';

type SharedTableProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

type TableContainerProps = SharedTableProps & {
  mb?: CSSProperties['marginBottom'];
  mt?: CSSProperties['marginTop'];
  minWidth?: CSSProperties['minWidth'];
  br?: CSSProperties['borderRadius'];
};

type TableProps = SharedTableProps & {
  size?: 'small' | 'medium' | 'large' | 'xlarge';
};

type TableCellProps = SharedTableProps & {
  a?: 'left' | 'center' | 'right';
  fw?: CSSProperties['fontWeight'];
  s?: CSSProperties['fontSize'];
};

const TableContainer: React.FC<TableContainerProps> = ({
  children,
  className,
  style,
  mb: marginBottom,
  mt: marginTop,
  br: borderRadius,
  minWidth,
}) => {
  return (
    <div
      className={`table-container ${className}`}
      style={{
        ...style,
        marginBottom: marginBottom,
        marginTop: marginTop,
        minWidth: minWidth,
        borderRadius: borderRadius,
      }}
    >
      {children}
    </div>
  );
};
const Table: React.FC<TableProps> = ({ children, className, style, size = 'medium' }) => {
  return (
    <table className={`table-root${size ? `-${size}` : ''} ${className}`} style={style}>
      {children}
    </table>
  );
};

const TableHead: React.FC<SharedTableProps> = ({ children, className, style }) => {
  return (
    <thead className={`table-head ${className}`} style={style}>
      {children}
    </thead>
  );
};

const TableRow: React.FC<SharedTableProps> = ({ children, className, style }) => {
  return (
    <tr className={`table-row ${className}`} style={style}>
      {children}
    </tr>
  );
};

const TableBody: React.FC<SharedTableProps> = ({ children, className, style }) => {
  return (
    <tbody className={`table-body ${className}`} style={style}>
      {children}
    </tbody>
  );
};

const TableCell: React.FC<TableCellProps> = ({
  children,
  a: align = 'left',
  className,
  style,
  fw: fontWeight = 'normal',
  s: fontSize,
}) => {
  const cellStyle: CSSProperties = {
    ...style,
  };

  return (
    <td className={`table-cell ${className}`} style={cellStyle}>
      <Text a={align} fw={fontWeight} s={fontSize}>
        {children}
      </Text>
    </td>
  );
};

export { Table, TableContainer, TableHead, TableRow, TableCell, TableBody };
