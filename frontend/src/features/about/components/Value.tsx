import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { ButtonBar, ConfirmationModal } from '@/components/Built';
import { Flexer } from '@/components/Containers';
import { BaseProps, Text } from '@/components/Elements';
import { FormGenerator } from '@/components/Form';
import { MaterialIcon } from '@/components/Media';

import { ValueType } from '../types';
import './css/Value.css';
import { useApp } from '@/hooks';

interface ValueProps extends BaseProps {
  value: ValueType;
  index: number;
  start: number;
}

export const Value: React.FC<ValueProps> = ({ value, index, start, ...rest }) => {
  const { editMode } = useApp();
  const [valueData, setValueData] = useState<ValueType>(value);
  const [editing, setEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);

  useEffect(() => {
    setValueData(value);
  }, [value]);

  const updateValue = (updateValue: ValueType) => {
    setValueData(updateValue);
    setEditing(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id: string | number | null) => {
    handleOpen();
    setSelectedId(id);
  };

  const handleConfirmDelete = () => {
    confirmedDelete(selectedId);
    handleClose();
  };

  const confirmedDelete = async (id: string | number | null) => {
    if (id) {
      await axios.delete(`http://localhost:8000/api/value/${id}/`);
    }
  };

  return (
    <Flexer j="c" a="c" key={index} {...rest}>
      {!editing ? (
        <div className="value-container fade-in">
          <MaterialIcon
            size="28px"
            icon={valueData.icon}
            className={index % 2 === start ? 'value-icon' : 'value-icon-alt'}
          />
          <Text className="value-title" a="c" mb={8}>
            {valueData.title}
          </Text>
          <Flexer a="c" j="fe" w="90%">
            {!editing && editMode && (
              <React.Fragment>
                <ButtonBar
                  editClick={() => setEditing(!editing)}
                  deleteClick={() => handleDelete(value.id)}
                  tooltipPosition="top"
                  text="Value"
                  obj={value.id}
                />
              </React.Fragment>
            )}
          </Flexer>
        </div>
      ) : (
        <FormGenerator
          endpoint={`value/${valueData.id}/`}
          onUpdate={updateValue}
          data={valueData}
          title="Edit"
          width="90%"
          excludeKeys={['id', 'icon']}
          handleCancel={() => setEditing(!editing)}
          iconMixin
          px={1.5}
          py={1.5}
          boxShadow
          placement="top"
        />
      )}
      <ConfirmationModal
        open={open}
        handleClose={handleClose}
        handleConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this?"
        // warning="Warning: This cannot be undone."
      />
    </Flexer>
  );
};
