import { Button, ToggleButton, ToggleButtonGroup } from '@/components/Buttons';
import { Flexer } from '@/components/Containers';
import React from 'react';

interface ApplicationFilterProps {
  statusFilter: string | null;
  setStatusFilter: (value: string | null) => void;
  handleClearFilters: () => void;
}

const ApplicationFilter: React.FC<ApplicationFilterProps> = ({
  statusFilter,
  setStatusFilter,
  handleClearFilters,
}) => {
  const handleStatusFilterChange = (value: string | null) => {
    setStatusFilter(value);
  };

  const disabledCheck = statusFilter === null;

  return (
    <Flexer mt={10} gap={16}>
      <ToggleButtonGroup value={statusFilter} onChange={handleStatusFilterChange}>
        <ToggleButton value="pending" style={{ width: 100 }}>
          Pending
        </ToggleButton>
        <ToggleButton value="accepted" style={{ width: 100 }}>
          Accepted
        </ToggleButton>
        <ToggleButton value="rejected" style={{ width: 100 }}>
          Rejected
        </ToggleButton>
      </ToggleButtonGroup>
      <Button
        w="auto"
        ml={-6}
        size="md"
        className={`${disabledCheck ? 'error-button' : 'success-button'}`}
        onClick={handleClearFilters}
        disabled={disabledCheck}
        style={{ borderRadius: 6, height: 24 }}
      >
        Reset
      </Button>
    </Flexer>
  );
};

export default ApplicationFilter;
