import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import { Page } from '@/components/Layout';
import { Flexer, Surface } from '@/components/Containers';
import { Breadcrumbs, Text, Tooltip } from '@/components/Elements';
import { axios } from '@/lib/api';

import Message from './Message';
import { useBreakpoint } from '@/hooks';

const MessageView: React.FC<{}> = ({}) => {
  const { pk } = useParams<{ pk: string }>();
  const location = useLocation();
  const isSmallScreen = useBreakpoint('sm');

  const [ready, setReady] = useState(false);
  const [error, setError] = useState<any>(null);

  const [model, setModel] = useState<any>(null);
  const [appName, setAppName] = useState<string | null>(null);
  const [keys, setKeys] = useState<any[] | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<any>(null);
  const [id, setId] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (location.state) {
      setUrl(location.state.url);
      setAppName(location.state.appName);
      setKeys(location.state.keys);
      setMetadata(location.state.metadata);
      setModel(location.state.model);
      setId(location.state.id);
      setData(location.state.data);

      axios
        .get(`${location.state.url}${location.state.id}/`)
        .then((response) => {
          setData(response.data.messages);
          // setCount(response.data.count);
          setReady(true);
        })
        .catch((err) => {
          setError(err.error);
          setReady(true);
        });
    } else if (pk) {
      axios
        .get(`/get_models/messages/`)
        .then((response) => {
          setUrl(response.data.url);
          setAppName(response.data.app_name);
          setKeys(response.data.keys);
          setMetadata(response.data.metadata);
          setModel(response.data);
        })
        .catch((err) => {
          setError(err.error);
          setReady(true);
        });
      axios
        .get(`messages/${pk}/`)
        .then((response) => {
          setData(response.data.messages);
          // setCount(response.data.count);
          setReady(true);
        })
        .catch((err) => {
          setError(err.error);
          setReady(true);
        });
    }
    // }, [location.state, pk, setCount]);
  }, [location.state, pk]);

  if (!ready) {
    return null;
  }

  return (
    <Page>
      {metadata && data && (
        <Surface maxWidth={1200} pt={32} pb={32} px={3} py={3} boxShadow={1} br={8} j="c">
          <Flexer>
            {!isSmallScreen && (
              <Text w="auto" t="h3" mr={16} className="breadcrumb-title">
                {model?.verbose_name}
              </Text>
            )}
            <Breadcrumbs aria-label="breadcrumb">
              <Tooltip text="View Dashboard" position="bottom">
                <Link className="link-text" to="/admin">
                  Home
                </Link>
              </Tooltip>
              <Tooltip text={`View ${model?.verbose_name} Model`} position="bottom">
                <Link
                  to={`/admin${url}`}
                  state={{
                    url: url,
                    keys: keys,
                    appName: appName,
                    model: model,
                    metadata: metadata,
                    id: id,
                  }}
                  key={appName}
                  className="link-text"
                >
                  {model?.verbose_name}
                </Link>
              </Tooltip>
              <Text s={isSmallScreen ? '0.8rem' : '0.95rem'}>Read</Text>
            </Breadcrumbs>
          </Flexer>
          <Message message={data} metadata={metadata} />
        </Surface>
      )}
    </Page>
  );
};

export default MessageView;
