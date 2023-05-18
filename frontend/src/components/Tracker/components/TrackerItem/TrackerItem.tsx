import React, { useState } from "react";

import { ActionButton } from "../../../../framework/Prebuilt/Buttons";
import Flexer from "../../../../framework/Containers/Flexer/Flexer";
import ItemControlModal from "./components/ItemControlModal/ItemControlModal";
import ItemReport from "./components/ItemReport/ItemReport";
import Section from "../../../../framework/Containers/Section/Section";
import { Data } from "../../Tracker";

interface TrackerItemProps {
  setData: React.Dispatch<React.SetStateAction<Data>>;
  data: Data;
  dataArray: Data[];
  headerText: string;
  buttonText: string;
  addClick: () => void;
  position?: "left" | "right";
}

const TrackerItem: React.FC<TrackerItemProps> = ({
  setData,
  data,
  dataArray,
  headerText,
  buttonText,
  addClick,
  position = "left",
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Section
      header={`Current ${headerText}`}
      headerVar="h5"
      mb={1}
      mt={2}
      pl={2}
      pr={2}
      pad={2}
      boxShadow={1}
      br={0.75}
      divider
    >
      <Flexer j="fe">
        <ActionButton
          size="tiny"
          type="add"
          fontSize={"1rem"}
          color="primary"
          onClick={openModal}
        />
      </Flexer>
      <ItemReport
        openModal={openModal}
        dataArray={dataArray}
        headerText={headerText}
        buttonText={buttonText}
        position={position}
      />
      <ItemControlModal
        data={data}
        setData={setData}
        headerText={headerText}
        open={modalOpen}
        cancelClick={closeModal}
        confirmClick={addClick}
      />
    </Section>
  );
};

export default TrackerItem;
