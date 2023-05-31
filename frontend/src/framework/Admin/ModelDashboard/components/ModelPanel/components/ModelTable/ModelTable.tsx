import React, { useEffect, useState } from "react";

import {
  ConfirmationModal,
  Pagination,
  usePagination,
} from "../../../../../../Prebuilt";
import { Table, TableContainer } from "../../../../../../Base";
import {
  ModelTableBody,
  ModelTableControl,
  ModelTableHead,
} from "./components";
import { Surface } from "../../../../../../Containers";

interface ModelTableProps {
  open: boolean;
  keys: any;
  data: any[];
  metadata: any;
  model: any;
  handleEdit: any;
  handleDelete: (data: any) => void;
  handleClose: () => void;
  handleConfirmDelete: () => void;
  handleMultipleDeleteAction: (selectedIds: any[]) => void;
  updateMultipleItems: (
    selectedIds: any[],
    field: string[],
    booleanValue: boolean
  ) => void;
  type: string | null;
  formattedAppName: string | null;
}

const ModelTable: React.FC<ModelTableProps> = ({
  open,
  keys,
  data,
  metadata,
  model,
  handleEdit,
  handleDelete,
  handleClose,
  handleConfirmDelete,
  handleMultipleDeleteAction,
  updateMultipleItems,
  type,
  formattedAppName,
}) => {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [selectedAction, setSelectedAction] = useState<string>("");

  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("");

  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination(10);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const [isReadFilter, setIsReadFilter] = useState<string | null>(null);
  const [isArchivedFilter, setIsArchivedFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const [filteredData, setFilteredData] = useState<any[]>(data);

  function filterReadData(data: any[]): any[] {
    // add check for "read" to make true, "unread to false"
    if (isReadFilter === null) {
      return data;
    }
    return data.filter((item) => item.is_read === isReadFilter);
  }

  function filterArchivedData(data: any[]): any[] {
    if (isArchivedFilter === null) {
      return data;
    }
    return data.filter((item) => item.is_archived === isArchivedFilter);
  }

  function filterStatusData(data: any[]): any[] {
    if (statusFilter === null) {
      return data;
    }
    return data.filter((item) => item.status === statusFilter);
  }

  const handleFilterData = () => {
    const result = filterReadData(filterArchivedData(filterStatusData(data)));
    setFilteredData(result);
  };

  useEffect(() => {
    if (type === "new") {
      setIsReadFilter("unread");
      setIsArchivedFilter("unarchived");
    }
  }, []);

  useEffect(() => {
    handleFilterData();
  }, [data, isReadFilter, isArchivedFilter, statusFilter]);

  const handleClearFilters = () => {
    setIsReadFilter(null);
    setIsArchivedFilter(null);
    setStatusFilter(null);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleSelectItem = (item: any) => {
    const itemIndex = selectedItems.findIndex(
      (selectedItem) => selectedItem.id === item.id
    );
    if (itemIndex === -1) {
      setSelectedItems([...selectedItems, item]);
    } else {
      const newSelectedItems = [...selectedItems];
      newSelectedItems.splice(itemIndex, 1);
      setSelectedItems(newSelectedItems);
    }
  };

  const handleActionSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAction(event.target.value);
  };

  const handleMultipleDelete = () => {
    const selectedIds = selectedItems.map((item) => item.id);
    handleMultipleDeleteAction(selectedIds);
    setSelectedItems([]);
    setSelectedAction("");
  };

  const handleMultipleItemActions = (field: string, booleanValue: boolean) => {
    const selectedIds = selectedItems.map((item) => item.id);
    updateMultipleItems(selectedIds, [field], booleanValue);
    setSelectedItems([]);
    setSelectedAction("");
  };

  const handleCustomPageChange = (newPage: number) => {
    handleChangePage(null, newPage);
  };

  const handleCustomRowsPerPageChange = (newRowsPerPage: any) => {
    handleChangeRowsPerPage({ target: { value: newRowsPerPage } });
  };

  const handleSort = (column: string) => {
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);
    filteredData.sort((a, b) => {
      if (a[column] < b[column]) {
        return isAsc ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return isAsc ? 1 : -1;
      }
      return 0;
    });
  };

  return (
    <Surface boxShadow={1} pt={4} pb={2}>
      <ModelTableControl
        modelName={model.model_name}
        keys={keys}
        isReadFilter={isReadFilter}
        setIsReadFilter={setIsReadFilter}
        isArchivedFilter={isArchivedFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        setIsArchivedFilter={setIsArchivedFilter}
        handleClearFilters={handleClearFilters}
        selectedAction={selectedAction}
        handleActionSelect={handleActionSelect}
        selectedItems={selectedItems}
        handleMultipleDelete={handleMultipleDelete}
        handleMultipleItemActions={handleMultipleItemActions}
        handleClearSearch={handleClearSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <TableContainer mt={20}>
        <Table>
          <ModelTableHead
            keys={keys}
            data={data}
            metadata={metadata}
            model={model}
            order={order}
            orderBy={orderBy}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            filteredData={filteredData}
            handleSort={handleSort}
          />
          <ModelTableBody
            keys={keys}
            metadata={metadata}
            model={model}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            filteredData={filteredData}
            order={order}
            orderBy={orderBy}
            page={page}
            rowsPerPage={rowsPerPage}
            selectedItems={selectedItems}
            handleSelectItem={handleSelectItem}
            searchTerm={searchTerm}
          />
        </Table>
      </TableContainer>
      <Pagination
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleCustomPageChange}
        onRowsPerPageChange={handleCustomRowsPerPageChange}
        rowOptions={[5, 10, 25]}
      />
      <ConfirmationModal
        open={open}
        handleClose={handleClose}
        handleConfirm={handleConfirmDelete}
        message={"Are you sure you want to delete this?"}
      />
    </Surface>
  );
};

export default ModelTable;
