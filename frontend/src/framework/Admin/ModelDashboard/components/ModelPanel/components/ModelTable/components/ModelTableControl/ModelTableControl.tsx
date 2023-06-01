import React from "react";

import {
  ApplicationFilter,
  BulkActions,
  MessageFilter,
  SearchBar,
} from "./components";
import { Text } from "../../../../../../../../Base";
import { Container, Flexer } from "../../../../../../../../Containers";

interface ModelTableControlProps {
  modelName: string;
  keys: string[];
  isReadFilter: string | null;
  setIsReadFilter: (value: string | null) => void;
  isArchivedFilter: string | null;
  statusFilter: string | null;
  setIsArchivedFilter: (value: string | null) => void;
  setStatusFilter: (value: string | null) => void;
  handleClearFilters: () => void;
  selectedAction: string;
  handleActionSelect: any;
  selectedItems: any[];
  handleMultipleDelete: () => void;
  handleMultipleItemActions: any;
  handleClearSearch: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ModelTableControl: React.FC<ModelTableControlProps> = ({
  modelName,
  keys,
  isReadFilter,
  setIsReadFilter,
  isArchivedFilter,
  statusFilter,
  setIsArchivedFilter,
  setStatusFilter,
  handleClearFilters,
  selectedAction,
  handleActionSelect,
  selectedItems,
  handleMultipleDelete,
  handleMultipleItemActions,
  handleClearSearch,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <React.Fragment>
      <Flexer j="sb">
        <Text s="0.9rem" ml={4} mb={2}>
          Select Bulk Action
        </Text>
        <Text a="r" s="0.9rem" mr={125} mb={2}>
          Search Table
        </Text>
      </Flexer>
      <Container justify="flex-start">
        <BulkActions
          keys={keys}
          selectedAction={selectedAction}
          handleActionSelect={handleActionSelect}
          selectedItems={selectedItems}
          handleMultipleDelete={handleMultipleDelete}
          handleMultipleItemActions={handleMultipleItemActions}
        />
        <SearchBar
          handleClearSearch={handleClearSearch}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        {(keys.includes("is_read") || keys.includes("is_archived")) && (
          <MessageFilter
            isReadFilter={isReadFilter}
            setIsReadFilter={setIsReadFilter}
            isArchivedFilter={isArchivedFilter}
            setIsArchivedFilter={setIsArchivedFilter}
            handleClearFilters={handleClearFilters}
          />
        )}
        {modelName === "application" && (
          <ApplicationFilter
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            handleClearFilters={handleClearFilters}
          />
        )}
      </Container>
    </React.Fragment>
  );
};

export default ModelTableControl;
