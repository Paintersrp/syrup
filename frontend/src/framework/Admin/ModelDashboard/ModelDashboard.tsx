import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { ApiAxiosInstance } from "../../../utils";
import { ModelPanel } from "./components";
import { Page } from "../../Containers";

interface ModelDashboardProps {
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const ModelDashboard: React.FC<ModelDashboardProps> = ({ setCount }) => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [data, setData] = useState<any>({});
  const [ready, setReady] = useState(false);
  const [type, setType] = useState<string | null>(null);
  const [recentActions, setRecentActions] = useState<any[]>([]);

  useEffect(() => {
    if (id === "messages" || id === "application") {
      setData({});
      setReady(false);
    }

    if (location.state) {
      setType(location.state.type);
    } else {
      setType(null);
    }
  }, [id, location.state]);

  useEffect(() => {
    ApiAxiosInstance.get(`/get_models/${id}/`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error));
    ApiAxiosInstance.get(`/recent_admin_actions/?model=${id}`)
      .then((response) => {
        setRecentActions(response.data);
        setReady(true);
      })
      .catch((error) => console.log(error));
  }, [id]);

  if (!ready) {
    return null;
  }

  return (
    <Page>
      <ModelPanel
        apiData={data}
        setCount={setCount}
        recentActions={recentActions}
        type={type}
      />
    </Page>
  );
};

export default ModelDashboard;
