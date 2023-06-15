import { CSSProperties, FC } from 'react';
import { Link, To, useLocation } from 'react-router-dom';

import { Button } from '@/components/Buttons';
import { Flexer } from '@/components/Containers';
import {
  BaseProps,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSizes,
  Text,
  Tooltip,
} from '@/components/Elements';
import { MaterialIcon } from '@/components/Media';

type Cell = { id: string; value: any };

type Column = {
  id: string;
  icon?: string | null;
  name: string;
  link?: To | any;
};

type Row = {
  id: string;
  name: string;
  cells: Cell[];
};

export type FullTable = {
  name: string;
  columns: Column[];
  rows: Row[];
};

interface DisplayTableProps extends BaseProps {
  data: FullTable;
  links?: boolean;
  size?: TableSizes;
  outerStyle?: CSSProperties;
  outerClass?: string;
  innerStyle?: CSSProperties;
  innerClass?: string;
}

export const DisplayTable: FC<DisplayTableProps> = ({
  data,
  links = false,
  size = 'medium',
  bs: boxShadow = 1,
  br: borderRadius = 12,
  minw: minWidth = 800,
  outerStyle,
  outerClass,
  innerStyle,
  innerClass,
  ...rest
}) => {
  const { pathname } = useLocation();
  return (
    <Flexer j="c" style={outerStyle} className={outerClass}>
      <TableContainer
        br={borderRadius}
        minw={minWidth}
        className={innerClass}
        style={innerStyle}
        bs={boxShadow}
        {...rest}
      >
        <Text a="c" t="h3" mt={16} mb={16}>
          {data.name}
        </Text>
        <Divider />
        <Table size={size}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Text t="h5" a="c" fw={500} mr={28}>
                  Features
                </Text>
              </TableCell>
              {data.columns.map((column) => (
                <TableCell key={column.id}>
                  <Flexer j="c" a="c">
                    {column.icon && <MaterialIcon icon={column.icon} ml={4} size="26px" />}
                    <Text t="h5" a="c" fw={500} mr={28}>
                      {column.name}
                    </Text>
                  </Flexer>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell a="center">{row.name}</TableCell>
                {row.cells.map((cell) => (
                  <TableCell key={cell.id} a="center">
                    {cell.value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {links && (
              <TableRow>
                <TableCell>{null}</TableCell>
                {data.columns.map((column) => (
                  <TableCell a="center">
                    {pathname === column.link ? (
                      <Tooltip key={column.id} text="Enterprise Tier Page" position="bottom">
                        <Button startIcon="link" w={110} disabled>
                          Learn More
                        </Button>
                      </Tooltip>
                    ) : (
                      <Link to={column.link}>
                        <Tooltip key={column.id} text="Enterprise Tier Page" position="bottom">
                          <Button size="sm" startIcon="link" w={100}>
                            Learn More
                          </Button>
                        </Tooltip>
                      </Link>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Flexer>
  );
};
