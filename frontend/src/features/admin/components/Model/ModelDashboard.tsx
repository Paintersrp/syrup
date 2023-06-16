import { useLoading } from '@/components/Elements';
import { Page } from '@/components/Layout';
import { axios } from '@/lib/api';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ModelPanel from './subcomponents/ModelPanel';

interface ModelDashboardProps {
  // setCount: React.Dispatch<React.SetStateAction<number>>;
}

const ModelDashboard: React.FC<ModelDashboardProps> = ({}) => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { loading, startLoad, endLoad } = useLoading();

  const [ready, setReady] = useState(false);
  const [error, setError] = useState<any>(null);

  const [data, setData] = useState<any>({});
  const [type, setType] = useState<string | null>(null);
  const [recentActions, setRecentActions] = useState<any[]>([]);

  useEffect(() => {
    if (id === 'messages' || id === 'application') {
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
    startLoad();
    axios
      .get(`/get_models/${id}/`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err.error);
        setReady(true);
        endLoad();
      });
    axios
      .get(`/recent_admin_actions/?model=${id}`)
      .then((response) => {
        setRecentActions(response.data);
        setReady(true);
        endLoad();
      })
      .catch((err) => {
        setError(err.error);
        setReady(true);
        endLoad();
      });
  }, [id]);

  if (!ready) {
    return null;
  }

  return (
    <Page>
      <ModelPanel apiData={data} recentActions={recentActions} type={type} />
    </Page>
  );
};

export default ModelDashboard;
