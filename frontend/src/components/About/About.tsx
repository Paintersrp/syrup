import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  AboutFAQ,
  ImageHeader,
  ImageHeaderEdit,
  Paragraph,
  Values,
} from "./components";
import { ButtonBar, Error, Flexer, Page, Surface } from "../../framework";
import { ApiAxiosInstance } from "../../utils";
import { seoData } from "../../settings";

interface AboutProps {}

const About: React.FC<AboutProps> = ({}) => {
  const [error, setError] = useState<any>(null);
  const editMode = useSelector((state: any) => state.editMode.editMode);

  const [data, setData] = useState<any>([]);
  const [ready, setReady] = useState(false);
  const [missionData, setMissionData] = useState<any>([]);
  const [historyData, setHistoryData] = useState<any>([]);
  const [valuesData, setValuesData] = useState<any>([]);
  const [editTitle, setEditTitle] = useState(false);
  const [editMission, setEditMission] = useState(false);
  const [editHistory, setEditHistory] = useState(false);
  const [missionBody, setMissionBody] = useState(false);
  const [historyBody, setHistoryBody] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      ApiAxiosInstance.get("/about/")
        .then((response) => {
          setData(response.data.AboutHeader);
          setMissionData(response.data.MissionStatement);
          setHistoryData(response.data.CompanyHistory);
          setValuesData(response.data.Value);
          setMissionBody(
            response.data.MissionStatement.body.replace(/<br\s*[\/]?>/gi, "")
          );
          setHistoryBody(
            response.data.CompanyHistory.body.replace(/<br\s*[\/]?>/gi, "")
          );
        })
        .then(() => {
          setReady(true);
        })
        .catch((err) => {
          console.log(err.error);
          setError(err.error);
        });
    };
    fetchData();
  }, []);

  const updateBlock = (updateBlock: any) => {
    setData(updateBlock);
    setEditTitle(false);
  };

  const updateMission = (updateMission: any) => {
    setMissionData(updateMission);
    setMissionBody(updateMission.body.replace(/<br\s*[\/]?>/gi, ""));
    setEditMission(false);
  };

  const updateHistory = (updateHistory: any) => {
    setHistoryData(updateHistory);
    setHistoryBody(updateHistory.body.replace(/<br\s*[\/]?>/gi, ""));
    setEditHistory(false);
  };

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
    <Page seoData={seoData.about}>
      <Surface maxWidth={900} j="c" a="c">
        {!editTitle && editMode && (
          <Flexer j="fe">
            <ButtonBar
              editClick={() => setEditTitle(!editTitle)}
              adminLink="aboutblock"
              text="About Header"
              tooltipPosition="bottom"
            />
          </Flexer>
        )}
        {!editTitle ? (
          <ImageHeader header={`About ${data.title}`} src={data.image} fade />
        ) : (
          <ImageHeaderEdit
            data={data}
            onUpdate={updateBlock}
            handleCancel={() => setEditTitle(!editTitle)}
          />
        )}
        <Paragraph
          data={missionData}
          editMode={editMode}
          editState={editMission}
          setEdit={setEditMission}
          onUpdate={updateMission}
          text="Mission Statement"
          adminLink="missionstatement"
        />
        <Paragraph
          data={historyData}
          editMode={editMode}
          editState={editHistory}
          setEdit={setEditHistory}
          onUpdate={updateHistory}
          text="Company History"
          adminLink="companyhistory"
        />
        <Values valuesData={valuesData} editMode={editMode} />
        <AboutFAQ editMode={editMode} />
      </Surface>
    </Page>
  );
};

export default About;
