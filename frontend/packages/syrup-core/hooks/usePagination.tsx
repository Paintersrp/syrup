import React, { useState, ChangeEvent } from 'react';

interface TablePaginationProps {
  page: number;
  rowsPerPage: number;
  handleChangePage: (newPage: number) => void;
  handleChangeRowsPerPage: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | any
  ) => void;
}

export function usePagination(defaultRowsPerPage: number = 10): TablePaginationProps {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(defaultRowsPerPage);

  const handleChangePage = (newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  };
}
