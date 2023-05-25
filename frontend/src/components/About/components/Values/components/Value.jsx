import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Value.css";

import { Icon, Text } from "../../../../../framework/Base";
import { Flexer } from "../../../../../framework/Containers";

export default function Value({ value, index, start }) {
  const auth = useSelector((state) => state.auth);

  const [valueData, setValueData] = useState(value);
  const [editing, setEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState([]);

  useEffect(() => {
    setValueData(value);
  }, [value]);

  const updateValue = (updateValue) => {
    setValueData(updateValue);
    setEditing(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    handleOpen();
    setSelectedId(id);
  };

  const handleConfirmDelete = () => {
    confirmedDelete(selectedId);
    handleClose();
  };

  const confirmedDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/value/${id}/`);
    onUpdate();
  };

  return (
    <React.Fragment key={index}>
      <div className="value-container">
        <Icon
          size="2rem"
          icon={valueData.icon}
          className={index % 2 === start ? "value-icon" : "value-icon-alt"}
        />
        <Text className="value-title" a="c" mb={8}>
          {valueData.title}
        </Text>
        <Flexer a="c" j="fe">
          {/* {!editing && editMode && edit && (
            <>
              <EditDeleteButtonMenu
                hideDelete
                editClick={() => setEditing(!editing)}
                deleteClick={() => handleDelete(value.id)}
                position="center"
                placement="bottom"
                text={`Value`}
                obj={value.id}
              />
            </>
          )} */}
        </Flexer>
      </div>
      {/* <DeleteConfirmationModal
        open={open}
        handleClose={handleClose}
        handleConfirmDelete={handleConfirmDelete}
        message="Are you sure you want to delete this?"
      /> */}
    </React.Fragment>
  );
}
