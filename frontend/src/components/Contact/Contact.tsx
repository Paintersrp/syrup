import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SocialType } from "../../settings";
import { ApiAxiosInstance } from "../../utils";
import { Contacts, Members } from "./components";
import { Error } from "../../framework/Prebuilt";
import { Page } from "../../framework/Containers";

export interface MemberData {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  [key: string]: string;
}

export interface ContactInformationData {
  email: string;
  phone: string;
  address: string;
}

export interface HoursData {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

interface ContactData {
  TeamMember: MemberData[];
  ContactInformation: ContactInformationData;
  Socials: SocialType;
  Hours: HoursData;
  JobPosting: any;
}

const Contact: React.FC = () => {
  const dispatch = useDispatch();
  const editMode = useSelector((state: any) => state.editMode.editMode);

  const [ready, setReady] = useState(false);
  const [error, setError] = useState<any>(null);
  const [membersData, setMembersData] = useState<MemberData[] | null>(null);
  const [contactData, setContactData] = useState<any>(null);
  const [socialData, setSocialData] = useState<any>(null);
  const [hoursData, setHoursData] = useState<any>(null);
  const [jobsData, setJobsData] = useState<any>(null);

  useEffect(() => {
    dispatch({ type: "FETCH_DATA_REQUEST" });
    const fetchData = async () => {
      try {
        const response = await ApiAxiosInstance.get<ContactData>("/appinfo/");
        setMembersData(response.data.TeamMember);
        setContactData(response.data.ContactInformation);
        setSocialData(response.data.Socials);
        setHoursData(response.data.Hours);
        setJobsData(response.data.JobPosting);
        dispatch({ type: "FETCH_DATA_SUCCESS" });
        setReady(true);
      } catch (err) {
        setError(err.error);
        dispatch({ type: "FETCH_DATA_FAILURE" });
      }
    };
    fetchData();
  }, []);

  if (error) {
    return (
      <Error
        message={error.message}
        description={error.description}
        instructions={error.instructions}
        thanks={error.thanks}
      />
    );
  }

  if (!ready || !membersData) {
    return null;
  }

  return (
    <Page>
      <Members membersData={membersData} editMode={editMode} />
      {/* <JobListing jobsData={jobsData} editMode={editmode.editMode} /> */}
      <Contacts
        color="dark"
        contactData={contactData}
        hoursData={hoursData}
        socialData={socialData}
        editMode={editMode}
      />
    </Page>
  );
};

export default Contact;
