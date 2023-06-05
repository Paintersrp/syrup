import React, { useEffect, useState } from "react";

import {
  BaseProps,
  ButtonBar,
  Flexer,
  IconTextItem,
  List,
  ManyToManyEdit,
  Text,
} from "../../../../framework";
import { palettes } from "../../../../utils";
import { JobData } from "../../Jobs";

interface JobQualificationProps {
  title: string;
  data: any;
  editMode: boolean;
  updateData: (updatedData: any) => void;
  fieldName: "requirements" | "responsibilities";
  id: number;
}

const JobQualification: React.FC<JobQualificationProps> = ({
  title,
  data,
  editMode,
  updateData,
  fieldName,
  id,
}) => {
  const [editingState, setEditingState] = useState(false);

  const handleUpdateData = (updatedData: any) => {
    updateData(updatedData);
    setEditingState(false);
  };

  return (
    <React.Fragment>
      {!editingState && (
        <List
          px={0}
          spacing={0}
          boxShadow={0}
          dividers={false}
          className="fade-in"
        >
          <Text t="h3" mt={16} mb={6}>
            {title}
          </Text>
          {data &&
            data[fieldName].map((item, index) => (
              <IconTextItem
                key={index}
                icon="check_circle"
                text={item.detail}
                iconColor={
                  index % 2 === 0
                    ? palettes.primary.main
                    : palettes.secondary.main
                }
                iconSize="21px"
              />
            ))}
        </List>
      )}
      {!editingState && editMode && (
        <ButtonBar
          justifyContent="flex-end"
          editClick={() => setEditingState(true)}
          text={title}
          tooltipPosition="bottom"
          mt={8}
        />
      )}
      {editingState && (
        <ManyToManyEdit
          data={data}
          updateData={handleUpdateData}
          endpoint="jobposting"
          handleCancel={() => setEditingState(!editingState)}
          id={id}
          fieldName={fieldName}
          title={`Edit ${title}`}
          mt={8}
        />
      )}
    </React.Fragment>
  );
};

interface JobQualificationsProps extends BaseProps {
  job: JobData;
  editMode: boolean;
}

const JobQualifications: React.FC<JobQualificationsProps> = ({
  job,
  editMode,
  ...rest
}) => {
  const [jobData, setJobData] = useState(job);

  useEffect(() => {
    setJobData(job);
  }, [job]);

  const updateRequirementData = (updatedData: any) => {
    setJobData(updatedData);
  };

  const updateResponsibilityData = (updatedData: any) => {
    setJobData(updatedData);
  };

  return (
    <Flexer fd="column" {...rest}>
      <JobQualification
        title="Job Requirements"
        data={jobData}
        editMode={editMode}
        updateData={updateRequirementData}
        fieldName="requirements"
        id={jobData.id}
      />
      <JobQualification
        title="Job Responsibilities"
        data={jobData}
        editMode={editMode}
        updateData={updateResponsibilityData}
        fieldName="responsibilities"
        id={jobData.id}
      />
    </Flexer>
  );
};

export default JobQualifications;
