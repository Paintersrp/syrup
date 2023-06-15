import { useState } from 'react';

import { axios } from '@/lib/api';

export const useConfirm = (endpoint: string) => {
  const [selectedId, setSelectedId] = useState<number>();
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

  const handleDelete = (id: number) => {
    handleOpen();
    setSelectedId(id);
  };

  const confirmedDelete = async (id: number) => {
    await axios.delete(`${endpoint}/${id}/`);
  };

  return {
    open,
    handleClose,
    handleConfirm,
    handleDelete,
  };
};
