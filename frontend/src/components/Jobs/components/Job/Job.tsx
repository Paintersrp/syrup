import React, { ReactNode } from "react";

import { BaseProps, ButtonBar, Surface } from "../../../../framework";

interface JobProps extends BaseProps {
  children: ReactNode;
  editMode: boolean;
}

const Job: React.FC<JobProps> = ({ children, editMode, ...rest }) => {
  return (
    <Surface
      maxWidth={1200}
      p={48}
      mt={32}
      mb={24}
      br={12}
      j="c"
      boxShadow={1}
      {...rest}
    >
      {editMode && (
        <ButtonBar
          adminLink="jobposting"
          tooltipPosition="top"
          text="Job Openings"
        />
      )}
      {children}
    </Surface>
  );
};

export default Job;
