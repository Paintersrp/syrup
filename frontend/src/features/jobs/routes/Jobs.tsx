import { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { usePageSetup } from '@/hooks';

import { useJobs } from '../api/useJobs';
import { Job } from '../components/Job';
import { JobApplicationForm } from '../components/JobApplicationForm';
import { JobDetails } from '../components/JobDetails';
import { JobListings } from '../components/JobListings';
import { JobQualifications } from '../components/JobQualifications';
import { Page } from '../../../components/Layout';

import { JobContent } from '../types';

export const Jobs: FC = () => {
  const { id } = useParams<{ id: any }>();
  const editMode: boolean = useSelector((state: any) => state.editMode.editMode);
  const { error, setError, ready, setReady } = usePageSetup();

  const [job, setJob] = useState<JobContent | null>(null);
  const [jobs, setJobs] = useState<JobContent[] | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    useJobs(setJobs, setJob, setError, parseInt(id ? id : 1));
    setReady(true);
  }, [id]);

  const handleApplyNowClick = () => {
    formRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  return (
    <Page error={error} ready={ready}>
      {job && jobs && (
        <Job editMode={editMode}>
          <JobDetails job={job} handleApplyNowClick={handleApplyNowClick} editMode={editMode} />
          <JobQualifications job={job} editMode={editMode} />
          <JobApplicationForm job={job} formRef={formRef} editMode={editMode} />
          <JobListings
            jobsData={jobs}
            header="Looking for something else?"
            subheader="See all our open positions below."
            currentId={job.id}
            editMode={editMode}
          />
        </Job>
      )}
    </Page>
  );
};
