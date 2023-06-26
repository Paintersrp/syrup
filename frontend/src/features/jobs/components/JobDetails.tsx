import { FC } from 'react';

import { Button } from '@/components/Buttons';
import { Container, Item } from '@/components/Containers';
import { Text } from '@/components/Elements';
import { Editable, useEditable } from '@/features/editable';
import { useBreakpoint } from '@/hooks';
import { BaseProps } from '@/theme/base';

import { JobContent } from '../types';

interface JobDetailsProps extends BaseProps {
  job: JobContent;
  handleApplyNowClick: () => void;
}

export const JobDetails: FC<JobDetailsProps> = ({ job, handleApplyNowClick, ...rest }) => {
  const isSmallScreen = useBreakpoint('xs');
  const [editableData, editConfig] = useEditable({
    name: `job - ${job.position}`,
    endpoint: `jobposting/`,
    data: job,
    id: job.id,
    editMenuPosition: 'bottom',
    excludeKeys: ['id', 'created_at', 'requirements', 'responsibilities', 'filled'],
    multilineKeys: ['who_we_are', 'looking_for', 'why_apply'],
    formSettings: {
      width: '100%',
      px: 3,
      py: 3,
    },
  });

  return (
    <Editable {...editConfig}>
      <div className="fade-in">
        <Container j="center">
          <Item
            xs={12}
            sm={4}
            style={{
              display: 'flex',
              justifyContent: isSmallScreen ? 'center' : 'flex-end',
              order: isSmallScreen ? 0 : 1,
            }}
          >
            <Button size="sm" onClick={handleApplyNowClick} startIcon="approval">
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
              {editableData.position}
            </Text>
          </Item>
        </Container>
        <Text t="body1" c="secondary">
          {editableData.location}
        </Text>
        <Text t="body1" c="secondary">
          {editableData.type}
        </Text>
        <Text t="h3" fw="bold" mt={32} mb={2}>
          Who We Are
        </Text>
        <Text t="body1" s="1rem" fw={400}>
          {editableData.who_we_are}
        </Text>
        <Text t="h3" mt={32} mb={2}>
          What We're Looking For
        </Text>
        <Text t="body1" s="1rem" fw={400}>
          {editableData.looking_for}
        </Text>
        <Text t="h3" mt={32} mb={2}>
          Why Apply?
        </Text>
        <Text t="body1" s="1rem" fw={400}>
          {editableData.why_apply}
        </Text>
      </div>
    </Editable>
  );
};
