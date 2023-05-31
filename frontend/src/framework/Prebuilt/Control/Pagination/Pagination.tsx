import React, { ChangeEvent } from "react";
import { IconButton, Option, Select, Text, Tooltip } from "../../../Base";
import { Flexer } from "../../../Containers";

interface PaginationProps {
  count: number;
  rowsPerPage: number;
  page: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  rowOptions: number[];
}

export const Pagination: React.FC<PaginationProps> = ({
  count,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
  rowOptions,
}) => {
  const totalPages = Math.ceil(count / rowsPerPage);
  const startIndex = page * rowsPerPage + 1;
  const endIndex = Math.min(startIndex + rowsPerPage - 1, count);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage - 1);
    }
  };

  const handleRowsPerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onRowsPerPageChange(Number(event.target.value));
  };

  return (
    <Flexer j="fe" a="c" mt={20} mb={20}>
      <Text t="body1" s="0.95rem" a="r" w="auto" mr={8}>
        Rows to Display:
      </Text>
      <Select
        dense
        onChange={handleRowsPerPageChange}
        value={rowsPerPage}
        style={{ maxWidth: 35 }}
        textStyle={{ textAlign: "center" }}
      >
        {rowOptions.map((option) => {
          return (
            <Option
              dense
              key={`select-${option}`}
              value={option}
              textStyle={{ textAlign: "center" }}
            >
              {option}
            </Option>
          );
        })}
      </Select>
      <Flexer w="auto" pr={2} pl={2}>
        <Text t="body1" s="0.95rem" mr={16} ml={16}>
          Current: {startIndex}-{endIndex} of {count}
        </Text>
      </Flexer>
      <Flexer w="auto" pr={16}>
        <Tooltip text="Prev" position="bottom" disabled={page === 0}>
          <IconButton
            size="t"
            fontSize="20px"
            material="chevron_left"
            disabled={page === 0}
            onClick={() => handlePageChange(page)}
            style={{ marginRight: 8 }}
          />
        </Tooltip>
        <Tooltip
          text="Next"
          position="bottom"
          disabled={page === totalPages - 1}
        >
          <IconButton
            size="t"
            fontSize="20px"
            material="chevron_right"
            disabled={page === totalPages - 1}
            onClick={() => handlePageChange(page + 2)}
          />
        </Tooltip>
      </Flexer>
    </Flexer>
  );
};
