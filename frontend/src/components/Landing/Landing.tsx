import React, { useEffect, useState } from "react";
import { ApiAxiosInstance } from "../../utils";
import { useDispatch, useSelector } from "react-redux";

import { Page } from "../../framework/Containers";
import { Hero } from "./components";

function Landing({}) {
  const dispatch: any = useDispatch();

  const [error, setError] = useState();
  const [data, setData] = useState({});
  const [heroData, setHeroData] = useState({});
  const [processData, setProcessData] = useState({});
  const [newsData, setNewsData] = useState({});
  const [serviceData, setServiceData] = useState({});
  const [contactData, setContactData] = useState({});
  const [socialsData, setSocialsData] = useState({});
  const [processBlock, setProcessBlock] = useState([]);
  const [newsBlock, setNewsBlock] = useState([]);
  const [editing, setEditing] = useState(false);
  const editmode = useSelector<any>((state) => state.editmode);

  useEffect(() => {
    dispatch({ type: "FETCH_DATA_REQUEST" });
    const fetchData = async () => {
      ApiAxiosInstance.get("/landing/")
        .then((response) => {
          setData(response.data);
          setHeroData(response.data.HeroBlock);
          setProcessData(response.data.Process);
          setProcessBlock(
            response.data.TitleBlock.find((tb) => tb.name === "process")
          );
          setNewsBlock(
            response.data.TitleBlock.find((tb) => tb.name === "news")
          );
          setNewsData(response.data.Articles);
          setContactData(response.data.ContactInformation);
          setSocialsData(response.data.Socials);
          setServiceData(response.data.ServiceTier);
          dispatch({ type: "FETCH_DATA_SUCCESS" });
        })
        .catch((err) => {
          console.log("ERROR: ", err);
          setError(err.error);
        })
        .then(dispatch({ type: "FETCH_DATA_FAILURE" }));
    };
    fetchData();
  }, []);

  //   if (error) {
  //     return (
  //       <ErrorPage
  //         message={error.message}
  //         description={error.description}
  //         instructions={error.instructions}
  //         thanks={error.thanks}
  //       />
  //     );
  //   }

  return (
    <Page>
      <Hero />
      {/* <ScrollTopFab />
      <FABMenu
        editing={editing}
        setEditing={setEditing}
        handleUpdate={handleUpdate}
      />
      {Object.keys(data).length > 0 && (
        <>
          <Hero
            data={data.HeroBlock}
            contactData={data.ContactInformation}
            socialData={data.Socials}
            editMode={editmode.editMode}
            form={true}
          />
          <Pricing serviceData={serviceData} />
          <Processes
            processData={processData}
            blockData={data.TitleBlock.find((tb) => tb.name === "process")}
          />
          <LatestNews articlesData={newsData} blockData={newsBlock} />
          <NewsletterForm editMode={editmode.editMode} />
          <IconScroller />
        </>
      )} */}
    </Page>
  );
}

export default Landing;
