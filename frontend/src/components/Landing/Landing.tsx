import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Hero,
  IconScroller,
  LatestPosts,
  Processes,
  Services,
} from "./components";
import { Error, Page, SectionHeaderData, useLoading } from "../../framework";
import { ContactInformationData } from "../Contact/Contact";
import { seoData, SocialType } from "../../settings";
import { ApiAxiosInstance } from "../../lib";

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

const useDataFetching = async (url, dataMappings) => {
  const { loading, startLoad, endLoad } = useLoading();
  startLoad();
  try {
    const response = await ApiAxiosInstance.get(url);
    dataMappings.forEach(({ state, name }) => {
      state(response.data[name]);
    });
    endLoad();
    return response;
  } catch (err) {
    endLoad();
    throw err;
  }
};

interface LandingProps {}

const Landing: React.FC<LandingProps> = () => {
  const dispatch: any = useDispatch();
  const { loading, startLoad, endLoad } = useLoading();
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
    startLoad();
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
        setReady(true);
        endLoad();
      } catch (err) {
        setError(err.error);
        setReady(true);
        endLoad(0);
      }
    };
    fetchData();
  }, [dispatch]);

  if (!ready) {
    return null;
  }

  return (
    <Page seoData={seoData.landing} error={error}>
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
