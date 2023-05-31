import React from "react";

import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "../../../../../../../../../../Base";
import { Flexer } from "../../../../../../../../../../Containers";

interface MessageFilterProps {
  isReadFilter: string | null;
  setIsReadFilter: (value: string | null) => void;
  isArchivedFilter: string | null;
  setIsArchivedFilter: (value: string | null) => void;
  handleClearFilters: () => void;
}

const MessageFilter: React.FC<MessageFilterProps> = ({
  isReadFilter,
  setIsReadFilter,
  isArchivedFilter,
  setIsArchivedFilter,
  handleClearFilters,
}) => {
  const handleReadFilterChange = (value: string | null) => {
    setIsReadFilter(value);
  };

  const handleArchivedFilterChange = (value: string | null) => {
    setIsArchivedFilter(value);
  };

  const disabledCheck = isArchivedFilter === null && isReadFilter === null;

  return (
    <Flexer mt={10} gap={16}>
      <ToggleButtonGroup value={isReadFilter} onChange={handleReadFilterChange}>
        <ToggleButton value="read" style={{ width: 100 }}>
          Read
        </ToggleButton>

        <ToggleButton value="unread" style={{ width: 100 }}>
          Unread
        </ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        value={isArchivedFilter}
        onChange={handleArchivedFilterChange}
      >
        <ToggleButton value="archived" style={{ width: 100 }}>
          Archived
        </ToggleButton>

        <ToggleButton value="unarchived" style={{ width: 100 }}>
          Unarchived
        </ToggleButton>
      </ToggleButtonGroup>
      <Button
        w="auto"
        ml={-6}
        size="medium"
        textSize="0.9rem"
        className={`${disabledCheck ? "error-button" : "success-button"}`}
        onClick={handleClearFilters}
        disabled={disabledCheck}
        style={{ borderRadius: 6, height: 24 }}
      >
        Reset
      </Button>
    </Flexer>
  );
};

export default MessageFilter;
