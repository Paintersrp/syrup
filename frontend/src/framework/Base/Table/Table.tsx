import React, { ReactNode, CSSProperties } from "react";
import Text from "../Text/Text";
import "./Table.css";

type SharedTableProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

type TableCellProps = SharedTableProps & {
  a?: "left" | "center" | "right";
  fw?: CSSProperties["fontWeight"];
  s?: CSSProperties["fontSize"];
};

const Table: React.FC<SharedTableProps> = ({ children, className, style }) => {
  return (
    <table className={`table-root ${className}`} style={style}>
      {children}
    </table>
  );
};

const TableHead: React.FC<SharedTableProps> = ({
  children,
  className,
  style,
}) => {
  return (
    <thead className={`table-head ${className}`} style={style}>
      {children}
    </thead>
  );
};

const TableRow: React.FC<SharedTableProps> = ({
  children,
  className,
  style,
}) => {
  return (
    <tr className={`table-row ${className}`} style={style}>
      {children}
    </tr>
  );
};

const TableBody: React.FC<SharedTableProps> = ({
  children,
  className,
  style,
}) => {
  return (
    <tbody className={`table-body ${className}`} style={style}>
      {children}
    </tbody>
  );
};

const TableCell: React.FC<TableCellProps> = ({
  children,
  a: align = "left",
  className,
  style,
  fw: fontWeight = "normal",
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

export { Table, TableHead, TableRow, TableCell, TableBody };
