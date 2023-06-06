import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import {
  ApiAxiosInstance,
  breakPoints,
  CapitalizeFirst,
  useBreakpoint,
} from "../../../utils";
import { Breadcrumbs, Text, Tooltip } from "../../Components";
import { Flexer, Page, Surface } from "../../Containers";
import { ObjectAutoForm } from "./components";

interface ModelData {
  verbose_name: string;
}

const ObjectDashboard: React.FC = () => {
  const { str, pk } = useParams();
  const location = useLocation();
  const isSmallScreen = useBreakpoint(breakPoints.sm);

  const [model, setModel] = useState<ModelData | null>(null);
  const [appName, setAppName] = useState<string | null>(null);
  const [formattedAppName, setFormattedAppName] = useState<string | null>(null);
  const [keys, setKeys] = useState<any[] | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<any | null>(null);
  const [id, setId] = useState<any | null>(null);
  const [data, setData] = useState<any | null>(null);
  const [ready, setReady] = useState(false);
  const [create, setCreate] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const fetchData = async () => {
    if (url && keys) {
      ApiAxiosInstance.get(url)
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    setReady(false);
    if (!location.state && !pk) {
      ApiAxiosInstance.get(`/get_models/${str}/`)
        .then((response) => {
          setUrl(response.data.url);
          setAppName(response.data.app_name);
          setKeys(response.data.keys);
          setMetadata(response.data.metadata);
          setModel(response.data);
          setReady(true);
          setCreate(true);
          setFormattedAppName(CapitalizeFirst(response.data.app_name));
        })
        .catch((error) => console.log(error));
    } else if (!location.state && pk) {
      ApiAxiosInstance.get(`/get_models/${str}/`)
        .then((response) => {
          setUrl(response.data.url);
          setAppName(response.data.app_name);
          setKeys(response.data.keys);
          setMetadata(response.data.metadata);
          setModel(response.data);
          setCreate(false);
          setFormattedAppName(CapitalizeFirst(response.data.app_name));
        })
        .catch((error) => console.log(error));
      ApiAxiosInstance.get(`/${str}/${pk}/`)
        .then((response) => {
          setData(response.data);
          setCreate(false);
          setReady(true);
        })
        .catch((error) => console.log(error));
    } else {
      setUrl(location.state.url);
      setAppName(location.state.appName);
      setKeys(location.state.keys);
      setMetadata(location.state.metadata);
      setModel(location.state.model);
      setId(location.state.id);
      setData(location.state.data);
      setReady(true);
      setFormattedAppName(CapitalizeFirst(location.state.appName));
    }
  }, []);

  const handleUpdate = () => {
    fetchData();
  };

  const handleModalUpdate = () => {
    ApiAxiosInstance.get(`/get_models/${str}/`)
      .then((response) => {
        setUrl(response.data.url);
        setAppName(response.data.app_name);
        setKeys(response.data.keys);
        setMetadata(response.data.metadata);
        setModel(response.data);
        setReady(true);
        setRefresh(true);
      })
      .catch((error) => console.log(error));
  };

  if (!ready) {
    return null;
  }

  return (
    <Page>
      {metadata && (
        <Surface
          maxWidth={1200}
          pt={32}
          pb={32}
          px={3}
          py={3}
          boxShadow={1}
          br={8}
          j="c"
        >
          <Flexer>
            {!isSmallScreen && (
              <Text w="auto" t="h3" mr={16} className="breadcrumb-title">
                {model?.verbose_name}
              </Text>
            )}
            <Breadcrumbs aria-label="breadcrumb">
              <Tooltip text={`Dashboard`} position="bottom">
                <Link className="link-text" to="/admin">
                  Home
                </Link>
              </Tooltip>
              <Tooltip text={`${formattedAppName} Overview`} position="bottom">
                <Link className="link-text" to={`/admin/model/${appName}`}>
                  {formattedAppName}
                </Link>
              </Tooltip>
              <Tooltip text={`${model?.verbose_name} Model`} position="bottom">
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
                  className="link-text"
                >
                  {model?.verbose_name}
                </Link>
              </Tooltip>
              <Text s={isSmallScreen ? "0.8rem" : "0.95rem"}>
                {Array.isArray(id) ? "Creation" : "Update"}
              </Text>
            </Breadcrumbs>
          </Flexer>
          {!Array.isArray(id) &&
          !data &&
          model?.verbose_name === "Articles" ? null : model?.verbose_name ===
            // <UpdateArticleView manualId={id} />
            "Articles" ? null : create ? (
            // <ArticleCreate />
            <ObjectAutoForm
              endpointUrl={url}
              handleUpdate={handleUpdate}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          ) : (
            <ObjectAutoForm
              endpointUrl={url}
              data={data}
              handleUpdate={handleUpdate}
              handleModalUpdate={handleModalUpdate}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          )}
        </Surface>
      )}
    </Page>
  );
};

export default ObjectDashboard;
