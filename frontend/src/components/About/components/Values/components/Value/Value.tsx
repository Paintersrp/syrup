import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Value.css";

import {
  ButtonBar,
  ConfirmationModal,
} from "../../../../../../framework/Prebuilt";
import { Icon, MaterialIcon, Text } from "../../../../../../framework/Base";
import { Flexer } from "../../../../../../framework/Containers";
import { ValueType } from "../../Values";
import ValueEdit from "../ValueEdit/ValueEdit";

interface ValueProps {
  value: ValueType;
  index: number;
  start: number;
}

const Value: React.FC<ValueProps> = ({ value, index, start }) => {
  const auth = useSelector((state: any) => state.auth);

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
    <Flexer key={index}>
      {!editing ? (
        <div className="value-container fade-in">
          <MaterialIcon
            size="2rem"
            icon={valueData.icon}
            className={index % 2 === start ? "value-icon" : "value-icon-alt"}
          />
          <Text className="value-title" a="c" mb={8}>
            {valueData.title}
          </Text>
          <Flexer a="c" j="fe" w="90%">
            {!editing && (
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
        <ValueEdit
          value={valueData}
          onUpdate={updateValue}
          handleCancel={() => setEditing(!editing)}
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

export default Value;
