import React, { useState } from "react";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./TransferList.css";

import IconButton from "../IconButton/IconButton";

interface TransferListItem {
  id: string;
  name: string;
}

interface TransferListProps {
  leftItems: TransferListItem[];
  rightItems: TransferListItem[];
}

const TransferList: React.FC<TransferListProps> = ({
  leftItems,
  rightItems,
}) => {
  const [selectedLeftItems, setSelectedLeftItems] = useState<string[]>([]);
  const [selectedRightItems, setSelectedRightItems] = useState<string[]>([]);

  const handleLeftItemClick = (itemId: string) => {
    if (selectedLeftItems.includes(itemId)) {
      setSelectedLeftItems(selectedLeftItems.filter((id) => id !== itemId));
    } else {
      setSelectedLeftItems([...selectedLeftItems, itemId]);
    }
  };

  const handleRightItemClick = (itemId: string) => {
    if (selectedRightItems.includes(itemId)) {
      setSelectedRightItems(selectedRightItems.filter((id) => id !== itemId));
    } else {
      setSelectedRightItems([...selectedRightItems, itemId]);
    }
  };

  const handleMoveRight = () => {
    const updatedLeftItems = leftItems.filter(
      (item) => !selectedLeftItems.includes(item.id)
    );
    const updatedRightItems = [
      ...rightItems,
      ...leftItems.filter((item) => selectedLeftItems.includes(item.id)),
    ];

    setSelectedLeftItems([]);
    setSelectedRightItems([]);
  };

  const handleMoveLeft = () => {
    const updatedLeftItems = [
      ...leftItems,
      ...rightItems.filter((item) => selectedRightItems.includes(item.id)),
    ];
    const updatedRightItems = rightItems.filter(
      (item) => !selectedRightItems.includes(item.id)
    );

    setSelectedLeftItems([]);
    setSelectedRightItems([]);
  };

  return (
    <div className="transfer-list-container">
      <div className="list-container">
        <h3 className="transfer-list-title">Left List</h3>
        <ul className="transfer-list">
          {leftItems.map((item) => (
            <li
              key={item.id}
              className={`transfer-list-item ${
                selectedLeftItems.includes(item.id) ? "selected" : ""
              }`}
              onClick={() => handleLeftItemClick(item.id)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="controls-container">
        <IconButton
          className="move-button"
          size="sm"
          icon={faArrowRight}
          onClick={handleMoveRight}
          mb={4}
        />
        <IconButton
          className="move-button"
          size="sm"
          icon={faArrowLeft}
          onClick={handleMoveLeft}
          mt={4}
        />
      </div>
      <div className="list-container">
        <h3 className="transfer-list-title">Right List</h3>
        <ul className="transfer-list">
          {rightItems.map((item) => (
            <li
              key={item.id}
              className={`transfer-list-item ${
                selectedRightItems.includes(item.id) ? "selected" : ""
              }`}
              onClick={() => handleRightItemClick(item.id)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransferList;
