import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  ContactForm,
  Contacts,
  Hours,
  Information,
  Members,
} from "./components";
import { Error, Item, Page, useLoading } from "../../framework";
import { seoData, SocialType } from "../../settings";
import { JobData, JobListings } from "../Jobs";
import { ApiAxiosInstance } from "../../lib";

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
  JobPosting: JobData;
}

const Contact: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, startLoad, endLoad } = useLoading();
  const editMode = useSelector((state: any) => state.editMode.editMode);

  const [ready, setReady] = useState(false);
  const [error, setError] = useState<any>(null);
  const [membersData, setMembersData] = useState<MemberData[] | null>(null);
  const [contactData, setContactData] = useState<any>(null);
  const [socialData, setSocialData] = useState<any>(null);
  const [hoursData, setHoursData] = useState<any>(null);
  const [jobsData, setJobsData] = useState<any>(null);

  useEffect(() => {
    startLoad();
    const fetchData = async () => {
      try {
        const response = await ApiAxiosInstance.get<ContactData>("/appinfo/");
        setMembersData(response.data.TeamMember);
        setContactData(response.data.ContactInformation);
        setSocialData(response.data.Socials);
        setHoursData(response.data.Hours);
        setJobsData(response.data.JobPosting);
        endLoad();
        setReady(true);
      } catch (err) {
        endLoad();
        setReady(true);
        setError(err.error);
      }
    };
    fetchData();
  }, []);

  if (!ready || !membersData) {
    return null;
  }

  return (
    <Page seoData={seoData.contact} error={error}>
      <Members membersData={membersData} editMode={editMode} />

      <Contacts
        color="dark"
        contactData={contactData}
        hoursData={hoursData}
        socialData={socialData}
        editMode={editMode}
      >
        <Item xs={6} style={{ flexDirection: "column" }}>
          <Information editMode={editMode} contactData={contactData} />
          <Hours hoursData={hoursData} editMode={editMode} />
        </Item>
        <ContactForm socialData={socialData} editMode={editMode} color="dark" />
      </Contacts>
      <JobListings jobsData={jobsData} editMode={editMode} />
    </Page>
  );
};

export default Contact;
