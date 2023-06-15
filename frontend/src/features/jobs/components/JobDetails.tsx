import { FC, useEffect, useState } from 'react';

import { ButtonBar } from '@/components/Built';
import { Button } from '@/components/Buttons';
import { Container, Flexer, Item } from '@/components/Containers';
import { BaseProps, Text } from '@/components/Elements';
import { FormGenerator } from '@/components/Form';
import { useApp } from '@/hooks';
import { breakPoints, palettes, useBreakpoint } from '@/utils';

import { JobContent } from '../types';

interface JobDetailsProps extends BaseProps {
  job: JobContent;
  handleApplyNowClick: () => void;
}

export const JobDetails: FC<JobDetailsProps> = ({ job, handleApplyNowClick, ...rest }) => {
  const { editMode }: any = useApp();
  const isSmallScreen = useBreakpoint(breakPoints.xs);
  const [jobData, setJobData] = useState(job);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setJobData(job);
  }, [job]);

  const updateJobData = (updatedJobData: typeof jobData) => {
    setJobData(updatedJobData);
    setEditing(false);
  };

  return (
    <Flexer mb={12} fd="column" {...rest}>
      {!editing ? (
        <div className="fade-in">
          {editMode && !editing && (
            <ButtonBar
              justifyContent="flex-end"
              editClick={() => setEditing(!editing)}
              text="Job Details"
              tooltipPosition="bottom"
              mt={8}
            />
          )}
          <Container justify="center">
            <Item
              xs={12}
              sm={4}
              style={{
                display: 'flex',
                justifyContent: isSmallScreen ? 'center' : 'flex-end',
                order: isSmallScreen ? 0 : 1,
              }}
            >
              <Button size="small" onClick={handleApplyNowClick} startIcon="approval">
                Apply Now
              </Button>
            </Item>
            <Item
              xs={12}
              sm={8}
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                order: isSmallScreen ? 1 : 0,
              }}
            >
              <Text t="h2" fw="bold">
                {jobData.position}
              </Text>
            </Item>
          </Container>
          <Text t="body1" c={palettes.text.secondary}>
            {jobData.location}
          </Text>
          <Text t="body1" c={palettes.text.secondary}>
            {jobData.type}
          </Text>
          <Text t="h3" fw="bold" mt={32} mb={2}>
            Who We Are
          </Text>
          <Text t="body1" s="1rem" fw={400}>
            {jobData.who_we_are}
          </Text>
          <Text t="h3" mt={32} mb={2}>
            What We're Looking For
          </Text>
          <Text t="body1" s="1rem" fw={400}>
            {jobData.looking_for}
          </Text>
          <Text t="h3" mt={32} mb={2}>
            Why Apply?
          </Text>
          <Text t="body1" s="1rem" fw={400}>
            {jobData.why_apply}
          </Text>
        </div>
      ) : (
        <FormGenerator
          title="Edit Job Details"
          endpoint={`jobposting/${jobData.id}/`}
          data={jobData}
          onUpdate={updateJobData}
          handleCancel={() => setEditing(!editing)}
          excludeKeys={['id', 'created_at', 'requirements', 'responsibilities', 'filled']}
          multilineKeys={['who_we_are', 'looking_for', 'why_apply']}
          px={3}
          py={3}
          br={8}
          placement="bottom"
          fade
        />
      )}
    </Flexer>
  );
};
