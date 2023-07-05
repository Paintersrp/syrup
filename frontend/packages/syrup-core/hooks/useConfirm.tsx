import React, { useState } from 'react';

export const useConfirm = (endpoint: string, axios: any) => {
  const [selectedId, setSelectedId] = useState<number | string | undefined>();
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleConfirm = () => {
    if (selectedId) {
      confirmedDelete(selectedId);
      handleClose();
    }
  };

  const handleDelete = (id: number | string | undefined) => {
    handleOpen();
    setSelectedId(id);
  };

  const confirmedDelete = async (id: number | string | undefined) => {
    await axios.delete(endpoint);
  };

  return {
    open,
    handleClose,
    handleConfirm,
    handleDelete,
  };
};
