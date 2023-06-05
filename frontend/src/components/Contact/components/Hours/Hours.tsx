import React, { useEffect, useState } from "react";

import {
  BaseProps,
  ButtonBar,
  Flexer,
  FormGenerator,
  IconTextItem,
  Stagger,
} from "../../../../framework";
import { palettes } from "../../../../utils";
import { HoursData } from "../../Contact";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

interface HoursProps extends BaseProps {
  hoursData: HoursData;
  editMode: boolean;
}

const Hours: React.FC<HoursProps> = ({ hoursData, editMode, ...rest }) => {
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
    <Flexer j="c" {...rest}>
      {!editing ? (
        <div style={{ width: 300, padding: "16px 24px" }}>
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
          <Stagger direction="right" orientation="vertical">
            {daysOfWeek.map((dayOfWeek, index) => (
              <IconTextItem
                textAlign="center"
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
            ))}
          </Stagger>
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
