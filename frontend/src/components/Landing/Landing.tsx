import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Hero,
  IconScroller,
  LatestPosts,
  Processes,
  Services,
} from "./components";
import { Error, Page, SectionHeaderData } from "../../framework";
import { ContactInformationData } from "../Contact/Contact";
import { ApiAxiosInstance } from "../../utils";
import { SocialType } from "../../settings";

export interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
}

export interface PostData {
  id: string;
  content: string;
  image: string;
  title: string;
  author_details: {
    first_name: string;
    last_name: string;
  };
  tags: any;
}

export interface ProcessData {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface LandingProps {}

const Landing: React.FC<LandingProps> = () => {
  const dispatch: any = useDispatch();
  const editMode: boolean = useSelector(
    (state: any) => state.editMode.editMode
  );

  const [ready, setReady] = useState(false);
  const [error, setError] = useState<any>(null);

  const [serviceData, setServiceData] = useState<any>({});
  const [heroData, setHeroData] = useState<HeroData | any>({});
  const [socialsData, setSocialsData] = useState<SocialType | any>({});
  const [contactData, setContactData] = useState<ContactInformationData | any>(
    {}
  );
  const [processData, setProcessData] = useState<ProcessData | any>({});
  const [processHeader, setProcessHeader] = useState<SectionHeaderData | any>(
    []
  );
  const [postsData, setPostsData] = useState<PostData | any>({});
  const [postsHeader, setPostsHeader] = useState<SectionHeaderData | any>([]);

  useEffect(() => {
    dispatch({ type: "FETCH_DATA_REQUEST" });
    const fetchData = async () => {
      try {
        const response = await ApiAxiosInstance.get("/landing/");
        setHeroData(response.data.HeroHeader);

        setContactData(response.data.ContactInformation);
        setSocialsData(response.data.Socials);

        setServiceData(response.data.ServiceTier);

        setProcessData(response.data.Process);
        setProcessHeader(
          response.data.SectionHeader.find((tb: any) => tb.name === "process")
        );

        setPostsData(response.data.Post);
        setPostsHeader(
          response.data.SectionHeader.find((tb: any) => tb.name === "news")
        );

        dispatch({ type: "FETCH_DATA_SUCCESS" });
        setReady(true);
      } catch (err) {
        setError(err.error);
        dispatch({ type: "FETCH_DATA_FAILURE" });
      }
    };
    fetchData();
  }, [dispatch]);

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

  if (!ready) {
    return null;
  }

  return (
    <Page>
      <Hero
        data={heroData}
        editMode={editMode}
        contactData={contactData}
        socialsData={socialsData}
      />
      {/* <Services serviceData={serviceData} />  */}
      <Services />
      <Processes
        processData={processData}
        headerData={processHeader}
        editMode={editMode}
      />
      <LatestPosts
        postsData={postsData}
        headerData={postsHeader}
        editMode={editMode}
      />
      <IconScroller />
    </Page>
  );
};

export default Landing;
