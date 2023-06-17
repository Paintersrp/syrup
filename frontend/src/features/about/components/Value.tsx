import { FC, Fragment, useEffect, useState } from 'react';
import axios from 'axios';

import { ButtonBar, ConfirmationModal } from '@/components/Built';
import { Flexer } from '@/components/Containers';
import { Base, BaseProps, Text } from '@/components/Elements';
import { FormGenerator } from '@/components/Form';
import { MaterialIcon } from '@/components/Media';

import { ValueType } from '../types';
import { useApp } from '@/hooks';
import { palettes } from '@/utils';

interface ValueProps extends BaseProps {
  value: ValueType;
  index: number;
  start: number;
}

export const Value: FC<ValueProps> = ({ value, index, start, ...rest }) => {
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
        <Base minw="100%" m="8px 0" className="fade-in">
          <MaterialIcon
            size="28px"
            icon={valueData.icon}
            css={{ color: index % 2 === start ? palettes.primary.main : palettes.secondary.main }}
          />
          <Text s="1rem" fw="500" mt={4} a="c" mb={8}>
            {valueData.title}
          </Text>
          <Flexer a="c" j="fe" w="90%">
            {!editing && editMode && (
              <Fragment>
                <ButtonBar
                  editClick={() => setEditing(!editing)}
                  deleteClick={() => handleDelete(value.id)}
                  tooltipPosition="top"
                  text="Value"
                  obj={value.id}
                />
              </Fragment>
            )}
          </Flexer>
        </Base>
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
