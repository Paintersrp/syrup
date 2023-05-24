import React from "react";
import "./ItemControlModal.css";

import { handleDataChange } from "../../../../../../utils/handlers/dataHandlers";
import { Button, Input, Modal } from "../../../../../../framework/Base";
import { Flexer } from "../../../../../../framework/Containers";

interface ItemControlModalProps {
  open: boolean;
  setData: React.Dispatch<React.SetStateAction<any>>;
  data: any;
  headerText: string;
  confirmClick: () => void;
  cancelClick: () => void;
}

const ItemControlModal: React.FC<ItemControlModalProps> = ({
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
