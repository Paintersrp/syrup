import React, { FC } from "react";
import { Link } from "react-router-dom";

import {
  BaseProps,
  Button,
  ButtonBar,
  Container,
  Divider,
  Flexer,
  Item,
  Surface,
  Text,
  Tooltip,
} from "../../../../framework";
import { breakPoints, palettes, useBreakpoint } from "../../../../utils";
import { JobData } from "../../Jobs";

interface JobListingsProps extends BaseProps {
  jobsData: JobData[];
  header?: string;
  subheader?: string;
  currentId?: number | null;
  editMode?: boolean;
}

const JobListings: FC<JobListingsProps> = ({
  jobsData,
  header = "Jobs",
  subheader = "Interested in joining our team? See our open positions below.",
  currentId = null,
  editMode,
  ...rest
}) => {
  const isSmallScreen = useBreakpoint(breakPoints.sm);

  return (
    <React.Fragment>
      {jobsData && (
        <Surface
          maxWidth={700}
          boxShadow={1}
          j="c"
          p={42}
          mt={48}
          mb={48}
          br={12}
          {...rest}
        >
          {editMode && (
            <ButtonBar
              adminLink="jobposting"
              tooltipPosition="top"
              text="Job Openings"
            />
          )}
          <Text t="h3" fw="bold" a="c">
            {header}
          </Text>
          <Text t="body1" fw="400" s="0.95rem" a="c" mb={12}>
            {subheader}
          </Text>
          {jobsData.map((jobPosting, index) => (
            <Flexer key={`job-${index}`} pl={16} pr={16} fd="column">
              <Container spacing={2} mb={12} mt={12}>
                <Item
                  xs={12}
                  md={7}
                  align="center"
                  style={{
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Text t="h5" fw="bold">
                    {jobPosting.position}
                  </Text>
                  <Text t="body1" fw="400" a="c">
                    {jobPosting.tagline}
                  </Text>
                </Item>
                <Item
                  xs={12}
                  md={5}
                  align="center"
                  style={{
                    display: "flex",
                    justifyContent: isSmallScreen
                      ? "space-between"
                      : "flex-end",
                  }}
                >
                  <Text t="body1" fw="400" a="c" mr={4}>
                    {jobPosting.location} - {jobPosting.type}
                  </Text>
                  {currentId !== jobPosting.id ? (
                    <Tooltip
                      text={`Apply Now - ${jobPosting.position}`}
                      position="bottom"
                    >
                      <Link to={`/jobposting/${jobPosting.id}`}>
                        <Button
                          color={
                            index % 2 === 0
                              ? palettes.secondary.dark
                              : palettes.primary.main
                          }
                          size="medium"
                        >
                          Apply
                        </Button>
                      </Link>
                    </Tooltip>
                  ) : (
                    <Button
                      size="medium"
                      disabled
                      color={
                        index % 2 === 0
                          ? palettes.secondary.dark
                          : palettes.primary.main
                      }
                    >
                      Apply
                    </Button>
                  )}
                </Item>
              </Container>

              <Divider
                style={{
                  backgroundColor:
                    index % 2 === 0
                      ? palettes.primary.light
                      : palettes.secondary.dark,
                  width: "100%",
                  marginTop: 4,
                  marginBottom: 4,
                }}
              />
            </Flexer>
          ))}
        </Surface>
      )}
    </React.Fragment>
  );
};

export default JobListings;
