import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  Job,
  JobApplicationForm,
  JobDetails,
  JobListings,
  JobQualifications,
} from "./components";
import { Page, useLoading } from "../../framework";
import { ApiAxiosInstance } from "../../lib";
import { seoData } from "../../settings";

export interface JobData {
  id: number;
  position: string;
  location: string;
  type: string;
  tagline: string;
  who_we_are: string;
  looking_for: string;
  why_apply: string;
  created_at: string;
  requirements: string;
  responsibilities: string;
  filled: boolean;
}

const Jobs: React.FC = () => {
  const { id } = useParams<{ id: any }>();
  const { loading, startLoad, endLoad } = useLoading();
  const editMode: boolean = useSelector(
    (state: any) => state.editMode.editMode
  );

  const [ready, setReady] = useState(false);
  const [error, setError] = useState<any>(null);
  const [job, setJob] = useState<JobData | null>(null);
  const [jobs, setJobs] = useState<JobData[] | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleApplyNowClick = () => {
    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  useEffect(() => {
    startLoad();
    ApiAxiosInstance.get("/jobposting/")
      .then((response) => {
        setJobs(response.data);
        setJob(
          response.data.find((jobData: JobData) => jobData.id === parseInt(id))
        );
      })
      .then(() => {
        setReady(true);
        endLoad();
      })
      .catch((err) => {
        endLoad();
        setReady(true);
        setError(err.error);
      });
  }, [id]);

  if (!ready) {
    return null;
  }

  return (
    <Page error={error}>
      {job && jobs && (
        <Job editMode={editMode}>
          <JobDetails
            job={job}
            handleApplyNowClick={handleApplyNowClick}
            editMode={editMode}
          />
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

export default Jobs;
