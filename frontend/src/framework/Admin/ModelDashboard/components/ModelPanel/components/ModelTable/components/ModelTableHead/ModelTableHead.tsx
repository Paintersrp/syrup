import React, { ChangeEvent } from "react";

import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortCell,
} from "../../../../../../../../Base";

interface Metadata {
  [key: string]: {
    verbose_name: string;
  };
}

interface ModelTableHeadProps {
  keys: string[];
  data: any[];
  metadata: Metadata;
  model: {
    model_name: string;
  };
  order: string;
  orderBy: string;
  selectedItems: any[];
  setSelectedItems: React.Dispatch<React.SetStateAction<any[]>>;
  filteredData: any[];
  handleSort: (key: string) => void;
}

const ModelTableHead: React.FC<ModelTableHeadProps> = ({
  keys,
  data,
  metadata,
  model,
  order,
  orderBy,
  selectedItems,
  setSelectedItems,
  filteredData,
  handleSort,
}) => {
  const toggleSelectAll = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedItems(filteredData);
    } else {
      setSelectedItems([]);
    }
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell a="center" style={{ width: "3%", minWidth: 35 }}>
          <Checkbox
            checked={selectedItems.length === data.length}
            onChange={toggleSelectAll}
          />
        </TableCell>
        <TableCell a="center" fw="bolder" style={{ width: "5%", minWidth: 35 }}>
          <TableSortCell
            active={orderBy === "id"}
            direction={orderBy === "id" ? order : "asc"}
            onClick={() => handleSort("id")}
            label="ID"
          />
        </TableCell>
        {keys.map((key) => (
          <React.Fragment key={key}>
            <TableCell a="center" fw={800}>
              <TableSortCell
                active={orderBy === key}
                direction={orderBy === key ? order : "asc"}
                onClick={() => handleSort(key)}
                label={
                  metadata[key].verbose_name === "image"
                    ? "Thumbnail"
                    : metadata[key].verbose_name
                }
              />
            </TableCell>
            {metadata[key].verbose_name === "Tag Name" && (
              <TableCell key="count" fw="bold">
                Times Used
              </TableCell>
            )}
          </React.Fragment>
        ))}

        {model.model_name === "questionnaire" ? (
          <TableCell style={{ textAlign: "center" }}>View</TableCell>
        ) : null}
        <TableCell a="center" fw="bold">
          {model.model_name === "messages" || model.model_name === "application"
            ? "Read"
            : "Edit"}
        </TableCell>
        <TableCell a="center" fw="bold">
          Delete
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default ModelTableHead;
