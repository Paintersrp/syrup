import React, { useEffect, useState } from "react";

import {
  Container,
  Flexer,
  Item,
  Surface,
} from "../../../../../../framework/Containers";
import { FormGenerator, IconTextItem } from "../../../../../../framework/Base";
import { ButtonBar } from "../../../../../../framework/Prebuilt";
import { palettes } from "../../../../../../utils/theming/theme";
import { HoursData } from "../../../../Contact";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

interface HoursProps {
  hoursData: HoursData;
  editMode: boolean;
}

const Hours: React.FC<HoursProps> = ({ hoursData, editMode }) => {
  const [data, setData] = useState<HoursData>(hoursData);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setData(hoursData);
  }, [hoursData]);

  const updateContactData = (updatedData: HoursData) => {
    setData(updatedData);
    setEditing(false);
  };

  return (
    <Flexer j="c">
      {!editing ? (
        <div className="fade-in">
          <Surface
            boxShadow={0}
            a="c"
            j="c"
            px={3}
            py={2}
            br={1}
            mt={0}
            mb={4}
            style={{ minWidth: 300 }}
          >
            <Container justify="center" style={{ maxWidth: 325 }}>
              {daysOfWeek.map((dayOfWeek, index) => (
                <Item
                  xs={6}
                  style={{
                    flexDirection: "column",
                  }}
                >
                  <IconTextItem
                    key={dayOfWeek}
                    icon="today"
                    text={dayOfWeek}
                    subtext={data[dayOfWeek.toLowerCase()]}
                    iconColor={
                      data[dayOfWeek.toLowerCase()] === "Closed"
                        ? palettes.error.main
                        : ""
                    }
                    subtextColor={
                      data[dayOfWeek.toLowerCase()] === "Closed"
                        ? palettes.error.main
                        : ""
                    }
                    divider={dayOfWeek !== "Sunday"}
                  />
                </Item>
              ))}
            </Container>
            {editMode && (
              <ButtonBar
                justifyContent="flex-end"
                editClick={() => setEditing(!editing)}
                adminLink="contactinformation"
                text="Hours"
                tooltipPosition="bottom"
                mt={8}
              />
            )}
          </Surface>
        </div>
      ) : (
        <FormGenerator
          title="Edit Business Hours"
          endpoint="hours/1/"
          data={data}
          onUpdate={updateContactData}
          handleCancel={() => setEditing(!editing)}
          width={300}
          excludeKeys={[
            "id",
            "facebook",
            "linkedin",
            "instagram",
            "twitter",
            "email",
            "address",
            "phone",
            "set_name",
          ]}
          multilineKeys={[""]}
          px={2}
          py={2}
          fade
          placement="bottom"
          boxShadow
        />
      )}
    </Flexer>
  );
};

export default Hours;
