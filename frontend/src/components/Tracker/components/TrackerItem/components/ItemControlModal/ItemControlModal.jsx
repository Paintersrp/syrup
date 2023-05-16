import React from "react";
import "./ItemControlModal.css";

import BaseButton from "../../../../../../framework/Base/BaseButton/BaseButton";
import BaseInput from "../../../../../../framework/Base/BaseInput/BaseInput";
import BaseModal from "../../../../../../framework/Base/BaseModal/BaseModal";
import Flexer from "../../../../../../framework/Base/Flexer/Flexer";

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
    <BaseModal isOpen={open} onClose={cancelClick}>
      <div className="input-group" key={`${headerText}-form`}>
        <BaseInput
          type="text"
          value={data.name}
          onChange={(e) => handleDataChange(e, setData, data)}
          name="name"
          helpText="Name"
        />
        <BaseInput
          type="number"
          value={data.amount}
          onChange={(e) => handleDataChange(e, setData, data)}
          name="amount"
          helpText="Amount"
        />
        <Flexer j="c">
          <BaseButton
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
          </BaseButton>
          <BaseButton
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
          </BaseButton>
        </Flexer>
      </div>
    </BaseModal>
  );
};

export default ItemControlModal;
