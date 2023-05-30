import React, { useEffect, useState } from "react";
import { ApiAxiosInstance } from "../../utils";
import { useDispatch, useSelector } from "react-redux";

import { Page } from "../../framework/Containers";
import { Hero, LatestPosts, Processes } from "./components";

interface LandingProps {}

const Landing: React.FC<LandingProps> = () => {
  const dispatch: any = useDispatch();
  const editMode: boolean = useSelector(
    (state: any) => state.editMode.editMode
  );

  const [ready, setReady] = useState(false);
  const [error, setError] = useState<any>();
  const [editing, setEditing] = useState(false);

  const [heroData, setHeroData] = useState<any>({});

  const [contactData, setContactData] = useState<any>({});
  const [socialsData, setSocialsData] = useState<any>({});

  const [serviceData, setServiceData] = useState<any>({});

  const [processData, setProcessData] = useState<any>({});
  const [processHeader, setProcessHeader] = useState<any[]>([]);

  const [postsData, setPostsData] = useState<any>({});
  const [postsHeader, setPostsHeader] = useState<any[]>([]);

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
        setError(err);
        dispatch({ type: "FETCH_DATA_FAILURE" });
      }
    };
    fetchData();
  }, [dispatch]);

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
      {/* <Pricing serviceData={serviceData} />  */}
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
      {/*                     
          <NewsletterForm editMode={editMode} />
          <IconScroller />       
       */}
    </Page>
  );
};

export default Landing;
