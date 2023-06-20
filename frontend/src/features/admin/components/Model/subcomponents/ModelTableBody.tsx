import { IconButton } from '@/components/Buttons';
import { Flexer } from '@/components/Containers';
import { TableBody, TableCell, TableRow, Tooltip } from '@/components/Elements';
import { Checkbox } from '@/components/Form';
import { Icon } from '@/components/Media';
import { colors } from '@/theme/common';
import { CapitalizeFirst } from '@/utils';
import React from 'react';

interface ModelTableBodyProps {
  keys: string[];
  metadata: any;
  model: {
    model_name: string;
    count?: {
      values: Record<string, any>;
    };
  };
  handleEdit: (item: any, type: string, flag: boolean) => void;
  handleDelete: (item: any) => void;
  filteredData: any[];
  order: string;
  orderBy: string;
  page: number;
  rowsPerPage: number;
  selectedItems: any[];
  handleSelectItem: (item: any) => void;
  searchTerm: string;
}

const ModelTableBody: React.FC<ModelTableBodyProps> = ({
  keys,
  metadata,
  model,
  handleEdit,
  handleDelete,
  filteredData,
  order,
  orderBy,
  page,
  rowsPerPage,
  selectedItems,
  handleSelectItem,
  searchTerm,
}) => {
  function renderColorPreview(value: string) {
    return (
      <div
        style={{
          width: '20px',
          height: '20px',
          backgroundColor: value,
          borderRadius: '50%',
          border: '1px solid grey',
        }}
      />
    );
  }
  function renderIcon(icon: string) {
    return <Icon size="21px" icon={icon} />;
  }

  function getTableCellContent(key: string, item: any) {
    const value = item[key];

    if (metadata[key].type === 'DateTimeField') {
      return new Date(value).toLocaleString();
    } else if (typeof value === 'boolean') {
      return value ? 'true' : 'false';
    } else if (key === 'token') {
      return '...' + value.substring(80, 120) + '...';
    } else if (key.includes('color')) {
      return renderColorPreview(value);
    } else if (key === 'author') {
      return item['author_details'].username;
    } else if (key === 'tag') {
      return item['tag_details'].name;
    } else if (key === 'components') {
      return item[key].map((component: any) => component.name).join(', ');
    } else if (key === 'used_on') {
      return item[key].map((component: any) => component).join(', ');
    } else if (key === 'content') {
      return item['content_type_info'].model;
    } else if (key === 'access') {
      return CapitalizeFirst(value);
    } else if (key === 'category') {
      return item['category_details'] ? item['category_details'].name : 'None';
    } else if (key === 'icon') {
      return renderIcon(value);
    } else {
      return value;
    }
  }

  function stableSort(array: any[], comparator: (a: any, b: any) => number) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order: string, orderBy: string) {
    return order === 'desc'
      ? (a: any, b: any) => descendingComparator(a, b, orderBy)
      : (a: any, b: any) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a: any, b: any, orderBy: string) {
    const aValue = Number(a[orderBy]);
    const bValue = Number(b[orderBy]);
    if (bValue < aValue) {
      return -1;
    }
    if (bValue > aValue) {
      return 1;
    }
    return 0;
  }

  return (
    <TableBody>
      {stableSort(filteredData, getComparator(order, orderBy))
        .filter((item) => {
          const values = Object.values(item)
            .filter((val) => val !== null)
            .map((val) => (typeof val === 'string' ? val.toLowerCase() : val));
          return values.some((val: any) =>
            val.toString().toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((item) => (
          <TableRow key={item.id}>
            <TableCell style={{ width: '3%' }} a="center">
              <Checkbox
                checked={
                  selectedItems.findIndex((selectedItem) => selectedItem.id === item.id) !== -1
                }
                onChange={() => handleSelectItem(item)}
              />
            </TableCell>
            <TableCell style={{ width: '3%' }} a="center">
              {item.id}
            </TableCell>
            {keys.map((key) => {
              return (
                <React.Fragment key={key}>
                  {metadata[key].type === 'ImageField' ? (
                    <TableCell a="center">
                      <img src={item[key]} alt="Thumbnail" style={{ width: 100, height: 75 }} />
                    </TableCell>
                  ) : (
                    <TableCell key={key} a="center" s="0.875rem">
                      {getTableCellContent(key, item)}
                    </TableCell>
                  )}
                  {metadata[key].verbose_name === 'Tag Name' && (
                    <TableCell key="count" a="center">
                      {model['count']
                        ? model['count'].values[item[key]]
                        : metadata['tag_counts'].values[item[key]]}
                    </TableCell>
                  )}
                </React.Fragment>
              );
            })}

            {model.model_name === 'questionnaire' ? (
              <TableCell style={{ width: '5%' }}>
                Add Tooltip
                <Flexer j="c" a="c">
                  <Tooltip text="View Analysis" position="bottom">
                    <IconButton
                      palette="success"
                      icon="bar_chart"
                      size="tiny"
                      onClick={() => handleEdit(item, 'analysis', false)}
                    />
                  </Tooltip>
                </Flexer>
              </TableCell>
            ) : null}

            <TableCell style={{ width: '5%' }}>
              <Flexer j="c">
                <Tooltip
                  text={
                    model.model_name === 'messages' || model.model_name === 'application'
                      ? `Read`
                      : 'Edit'
                  }
                  position="bottom"
                >
                  <IconButton
                    palette="success"
                    icon={
                      model.model_name === 'messages' || model.model_name === 'application'
                        ? 'email'
                        : 'edit'
                    }
                    size="tiny"
                    onClick={
                      model.model_name === 'post'
                        ? () => handleEdit(item, 'control', true)
                        : model.model_name === 'messages' || model.model_name === 'application'
                        ? () => handleEdit(item, 'read', false)
                        : () => handleEdit(item, 'control', false)
                    }
                  />
                </Tooltip>
              </Flexer>
            </TableCell>
            <TableCell style={{ width: '5%' }}>
              <Flexer j="c">
                <Tooltip text="Delete" position="bottom">
                  <IconButton
                    variant="hover"
                    palette="error"
                    icon="delete"
                    size="tiny"
                    onClick={() => handleDelete(item)}
                  />
                </Tooltip>
              </Flexer>
            </TableCell>
          </TableRow>
        ))}
    </TableBody>
  );
};

export default ModelTableBody;
