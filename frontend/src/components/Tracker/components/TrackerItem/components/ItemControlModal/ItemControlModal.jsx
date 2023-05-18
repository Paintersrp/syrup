import React from "react";
import "./ItemControlModal.css";

import Button from "../../../../../../framework/Base/Button/Button";
import Input from "../../../../../../framework/Base/Input/Input";
import Modal from "../../../../../../framework/Base/Modal/Modal";
import Flexer from "../../../../../../framework/Containers/Flexer/Flexer";

import { handleDataChange } from "../../../../../../utils/dataHandlers/dataHandlers";

const ItemControlModal = ({
  open,
  setData,
  data,
  headerText,
  confirmClick,
  cancelClick,
}) => {
  return (
    <Modal isOpen={open} onClose={cancelClick}>
      <div className="input-group" key={`${headerText}-form`}>
        <Input
          type="text"
          value={data.name}
          onChange={(e) => handleDataChange(e, setData, data)}
          name="name"
          helpText="Name"
        />
        <Input
          type="number"
          value={data.amount}
          onChange={(e) => handleDataChange(e, setData, data)}
          name="amount"
          helpText="Amount"
        />
        <Flexer j="c">
          <Button
            onClick={confirmClick}
            size="md"
            color="success"
            style={{
              marginTop: 8,
              marginRight: 4,
              minWidth: 65,
            }}
          >
            Confirm
          </Button>
          <Button
            onClick={cancelClick}
            size="md"
            color="error"
            style={{
              marginTop: 8,
              marginLeft: 4,
              minWidth: 65,
            }}
          >
            Cancel
          </Button>
        </Flexer>
      </div>
    </Modal>
  );
};

export default ItemControlModal;
