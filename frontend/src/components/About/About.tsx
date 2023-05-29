import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApiAxiosInstance } from "../../utils";
import "./About.css";

import { Flexer, Page, Surface } from "../../framework/Containers";
import { ButtonBar } from "../../framework/Prebuilt";
import {
  AboutFAQ,
  ImageHeader,
  ImageHeaderEdit,
  Paragraph,
  Values,
} from "./components";

import {
  faHeart,
  faStar,
  faCheck,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { TITLE } from "../../config";

const values = [
  { id: 1, icon: faHeart, title: "Love" },
  { id: 2, icon: faStar, title: "Excellence" },
  { id: 3, icon: faCheck, title: "Integrity" },
  { id: 4, icon: faGlobe, title: "Diversity" },
  { id: 5, icon: faHeart, title: "Passion" },
  { id: 6, icon: faStar, title: "Innovation" },
  { id: 7, icon: faCheck, title: "Accountability" },
  { id: 8, icon: faGlobe, title: "Collaboration" },
];

interface AboutProps {}

const About: React.FC<AboutProps> = ({}) => {
  const [error, setError] = useState([]);
  const [tabState, setTabState] = useState(0);
  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [missionData, setMissionData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [valuesData, setValuesData] = useState(values);
  const [editTitle, setEditTitle] = useState(false);
  const [editMission, setEditMission] = useState(false);
  const [editHistory, setEditHistory] = useState(false);
  const [missionBody, setMissionBody] = useState(false);
  const [historyBody, setHistoryBody] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      ApiAxiosInstance.get("/about/")
        .then((response) => {
          setData(response.data.AboutBlock);
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
        .catch((err) => {
          setError(err.error);
        });
    };
    fetchData();
  }, []);

  const updateBlock = (updateBlock) => {
    setData(updateBlock);
    setEditTitle(false);
  };

  const updateMission = (updateMission) => {
    setMissionData(updateMission);
    setMissionBody(updateMission.body.replace(/<br\s*[\/]?>/gi, ""));
    setEditMission(false);
  };
  const updateHistory = (updateHistory) => {
    setHistoryData(updateHistory);
    setHistoryBody(updateHistory.body.replace(/<br\s*[\/]?>/gi, ""));
    setEditHistory(false);
  };

  return (
    <Page>
      <Surface id="test" maxWidth={900} j="c" a="c">
        {!editTitle && (
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
          <ImageHeader fade />
        ) : (
          <ImageHeaderEdit
            data={{
              title: TITLE,
              image: "https://source.unsplash.com/1400x900/?service",
            }}
            onUpdate={updateBlock}
            handleCancel={() => setEditTitle(!editTitle)}
          />
        )}
        <Paragraph
          title="Mission Statement"
          body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eleifend, ante id fermentum interdum, libero libero tempus magna, in consectetur dolor urna id metus. Praesent sit amet odio nec dui tincidunt scelerisque. Sed vehicula ligula sit amet efficitur fringilla. Aenean tincidunt sapien sed fringilla tempus. Mauris bibendum a lorem id malesuada. Ut dapibus iaculis velit, sit amet mollis lectus. Phasellus mattis magna a maximus fermentum. Sed vel diam ut erat tincidunt vulputate at in nunc. Maecenas diam erat, fermentum vel leo vel, dictum posuere massa. Ut in maximus elit. Pellentesque tincidunt varius lobortis. Sed id risus sit amet lacus condimentum accumsan eget et magna. Suspendisse turpis mauris, pellentesque facilisis scelerisque quis, pellentesque et lectus. Ut rhoncus lectus placerat, eleifend ligula ut, volutpat magna. <br /> <br /> Quisque massa ante, ultricies id enim non, fermentum feugiat nisi. Vivamus commodo ex vel metus pretium, et elementum dui blandit. Aenean pharetra orci vel elit fermentum posuere. Integer posuere malesuada dignissim. Donec a gravida velit. Sed consectetur quam sit amet viverra semper. Etiam ligula velit, hendrerit sit amet interdum a, pellentesque at libero. Cras vel interdum urna. In hac habitasse platea dictumst. Praesent luctus justo sed ipsum aliquam, sit amet tempus orci euismod. Nunc viverra vel est ut mollis. "
          editState={editMission}
          setEdit={setEditMission}
          onUpdate={updateMission}
          text="Mission Statement"
          adminLink="missionstatement"
          type={"missionstatement"}
        />
        <Paragraph
          title="Company History"
          body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ante magna, fringilla sed augue vitae, consequat dapibus lorem. Nunc sit amet nisi quis lorem pulvinar efficitur id sit amet mi. Integer in risus vitae est fringilla pharetra. Donec tortor elit, sodales eu nisi convallis, lacinia euismod augue. Mauris varius, tellus fringilla sollicitudin dapibus, libero sem imperdiet dui, elementum scelerisque eros risus non tellus. Sed a lacinia ante. Curabitur neque enim, scelerisque dapibus diam ut, sollicitudin ornare turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec tristique volutpat risus vel malesuada. In feugiat, lorem ac mollis auctor, massa libero congue nunc, sed interdum sapien diam a neque. Mauris non lacinia lacus. Nulla sem dui, consequat id feugiat at, sodales maximus nunc. Praesent viverra non mauris quis tempus. Donec quis laoreet purus, ut elementum est."
          editState={editHistory}
          setEdit={setEditHistory}
          onUpdate={updateHistory}
          text="Company History"
          adminLink="companyhistory"
          type={"companyhistory"}
        />
        <Values valuesData={valuesData} />
        <AboutFAQ />
      </Surface>
    </Page>
  );
};

export default About;
