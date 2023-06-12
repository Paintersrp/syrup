import { ConfirmationModal } from '@/components/Built';
import { Button } from '@/components/Buttons';
import { Flexer, Item } from '@/components/Containers';
import { Option, Select } from '@/components/Form';

import React, { useState } from 'react';

interface BulkActionsProps {
  keys: string[];
  selectedAction: string;
  handleActionSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedItems: any[];
  handleMultipleDelete: (selectedIds: any[]) => void;
  handleMultipleItemActions: (field: string, booleanValue: boolean) => void;
}

const BulkActions: React.FC<BulkActionsProps> = ({
  keys,
  selectedAction,
  handleActionSelect,
  selectedItems,
  handleMultipleDelete,
  handleMultipleItemActions,
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    handleClose();
    const selectedIds = selectedItems.map((item) => item);
    handleMultipleDelete(selectedIds);
  };

  const handleMultipleActions = (field: string, booleanValue: boolean) => {
    handleMultipleItemActions(field, booleanValue);
  };

  const handleDelete = () => {
    handleOpen();
  };

  const handlePerformAction = () => {
    if (selectedAction === 'Delete Selected') {
      handleDelete();
    }
    if (selectedAction === 'Set Selected - Read') {
      handleMultipleActions('is_read', true);
    }
    if (selectedAction === 'Set Selected - Unread') {
      handleMultipleActions('is_read', false);
    }
    if (selectedAction === 'Set Selected - Archived') {
      handleMultipleActions('is_archived', true);
    }
    if (selectedAction === 'Set Selected - Unarchived') {
      handleMultipleActions('is_archived', false);
    }
  };

  const disabledCheck = selectedAction.length === 0 && selectedItems.length === 0;

  return (
    <Item xs={12} sm={6}>
      <Flexer j="fs">
        <Select dense value={selectedAction} onChange={handleActionSelect}>
          <Option dense value="Delete Selected">
            Delete Selected
          </Option>
          {keys.includes('is_read') && (
            <>
              <Option value="Set Selected - Read">Set Selected - Read</Option>
              <Option value="Set Selected - Unread">Set Selected - Unread</Option>
            </>
          )}
          {keys.includes('is_archived') && (
            <>
              <Option value="Set Selected - Archived">Set Selected - Archived</Option>
              <Option value="Set Selected - Unarchived">Set Selected - Unarchived</Option>
            </>
          )}
        </Select>
        <Button
          w="auto"
          ml={6}
          size="medium"
          textSize="0.9rem"
          className={`${disabledCheck ? 'error-button' : 'success-button'}`}
          onClick={handlePerformAction}
          disabled={disabledCheck}
          style={{ borderRadius: 6, height: 24 }}
        >
          GO
        </Button>
        <ConfirmationModal
          open={open}
          handleClose={handleClose}
          handleConfirm={handleConfirmDelete}
          message="Are you sure you want to delete these items?"
        />
      </Flexer>
    </Item>
  );
};

export default BulkActions;
