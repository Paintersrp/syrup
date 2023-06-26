import { FC, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Loading } from '@/components/Elements';
import { Page } from '@/components/Layout';

import { useJobs } from '../api/useJobs';
import { Job } from '../components/Job';
import { JobApplicationForm } from '../components/JobApplicationForm';
import { JobDetails } from '../components/JobDetails';
import { JobListings } from '../components/JobListings';
import { JobQualifications } from '../components/JobQualifications';

export const Jobs: FC = () => {
  const { id } = useParams<{ id: any }>();
  const { data, current, isLoading } = useJobs(id);
  const formRef = useRef<HTMLDivElement>(null);

  const handleApplyNowClick = () => {
    formRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  if (isLoading || !data || !current) {
    return <Loading load={true} />;
  }

  // Make job "Provider"

  return (
    <Page>
      <Job>
        <JobDetails job={current} handleApplyNowClick={handleApplyNowClick} />
        <JobQualifications job={current} />
        <JobApplicationForm job={current} formRef={formRef} />
        <JobListings
          jobsData={data}
          header="Looking for something else?"
          subheader="See all our open positions below."
          currentId={current.id}
        />
      </Job>
    </Page>
  );
};
