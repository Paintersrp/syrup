import React, { useEffect, useState } from "react";
import "./Tracker.css";

import Page from "../../framework/Base/Containers/Page/Page";
import Tracker from "./Tracker";

const TrackerPage = ({}) => {
  const [ready, setReady] = useState(true);

  useEffect(() => {
    console.log("replace_me");
    setReady(true);
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <Page>
      <Tracker />
    </Page>
  );
};

export default TrackerPage;
