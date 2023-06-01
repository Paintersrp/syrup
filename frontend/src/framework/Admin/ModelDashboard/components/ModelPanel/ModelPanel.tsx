import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Breadcrumbs,
  Divider,
  IconButton,
  Text,
  Tooltip,
} from "../../../../Base";
import { InfoMenu, ModelTable } from "./components";
import { palettes } from "../../../../../utils/theming/theme";
import { Content, Flexer } from "../../../../Containers";
import { ApiAxiosInstance, CapitalizeFirst } from "../../../../../utils";
import { RecentActions } from "../../../AdminLog";

interface ModelPanelProps {
  apiData: any;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  recentActions: any[];
  type: string | null;
}

const ModelPanel: React.FC<ModelPanelProps> = ({
  apiData,
  setCount,
  recentActions,
  type,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [data, setData] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);
  const [actionsOpen, setActionsOpen] = useState(true);

  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  const [model, setModel] = useState<any>(null);
  const [appName, setAppName] = useState<string | null>(null);
  const [formattedAppName, setFormattedAppName] = useState<string | null>(null);
  const [keys, setKeys] = useState<string[] | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<any | null>(null);

  const handleNavigateEdit = (
    data: any,
    path: string,
    noData: boolean
  ): void => {
    navigate(`/admin/${model.model_name}/${path}`, {
      state: {
        url: url,
        keys: keys,
        appName: appName,
        metadata: metadata,
        model: model,
        id: data.id,
        data: !noData ? data : null,
      },
    });
  };

  const fetchData = async (): Promise<void> => {
    if (url && keys) {
      ApiAxiosInstance.get(url)
        .then((response) => {
          setData(response.data);
          if (appName) {
            setFormattedAppName(CapitalizeFirst(appName));
          }
          setReady(true);
        })
        .catch((err) => {
          console.log(err);
          // setError(err);
        });
    }
  };

  useEffect(() => {
    setReady(false);
    if (!apiData) {
      setUrl(location.state.url);
      setAppName(location.state.appName);
      setKeys(location.state.keys);
      setMetadata(location.state.metadata);
      setModel(location.state.model);
    } else {
      setUrl(apiData.url);
      setAppName(apiData.app_name);
      setKeys(apiData.keys);
      setMetadata(apiData.metadata);
      setModel(apiData);
    }
    fetchData();
  }, [url, apiData, location.state]);

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleConfirmDelete = (): void => {
    confirmedDelete(selected);
    handleClose();
  };

  const handleDelete = (item: any): void => {
    handleOpen();
    setSelected(item);
  };

  const confirmedDelete = (selected: any): void => {
    const deleteEndpoint = `${url}${selected.id}/`;

    ApiAxiosInstance.delete(deleteEndpoint)
      .then(() => {
        setData((prevData) =>
          prevData.filter((dataItem) => dataItem.id !== selected.id)
        );
        dispatch({
          type: "ALERT_SUCCESS",
          message: `${model.verbose_name} - Object: ${selected.id} Deleted`,
        });
      })
      .catch((err) => {
        console.log(err);
        // setError(err);
      });
  };

  const handleMultipleDeleteAction = (selectedIds: any[]): void => {
    if (
      model.verbose_name === "SEO Headers" ||
      model.verbose_name === "Section Headings"
    ) {
      ApiAxiosInstance.delete(`${url}del/bulk/`, { data: { ids: selectedIds } })
        .then(() => {
          setData((prevData) =>
            prevData.filter((dataItem) => !selectedIds.includes(dataItem.id))
          );
          dispatch({
            type: "ALERT_SUCCESS",
            message: `${model.verbose_name} - Object(s): ${selectedIds} Deleted`,
          });
        })
        .catch((err) => {
          console.log(err);
          // setError(err);
        });
    } else {
      ApiAxiosInstance.delete(`${url}bulk/`, { data: { ids: selectedIds } })
        .then((response) => {
          setData((prevData) =>
            prevData.filter((dataItem) => !selectedIds.includes(dataItem.id))
          );
          dispatch({
            type: "ALERT_SUCCESS",
            message: `${model.verbose_name} - Object(s): ${selectedIds} Deleted`,
          });
          if (model.verbose_name === "Messages") {
            setCount(response.data.count);
          }
        })
        .catch((err) => {
          console.log(err);
          // setError(err);
        });
    }
  };

  const updateMultipleItems = (
    selectedIds: any[],
    field: any,
    booleanValue: boolean
  ): void => {
    ApiAxiosInstance.patch(`${url}bulk/`, {
      ids: selectedIds,
      field: field,
      value: booleanValue,
    })
      .then((response) => {
        if (field[0] === "is_archived" && booleanValue === true) {
          setData((prevData) =>
            prevData.map((dataItem) =>
              selectedIds.includes(dataItem.id)
                ? { ...dataItem, [field]: booleanValue, is_read: true }
                : dataItem
            )
          );
        } else if (field[0] === "is_read" && booleanValue === false) {
          setData((prevData) =>
            prevData.map((dataItem) =>
              selectedIds.includes(dataItem.id)
                ? { ...dataItem, [field]: booleanValue, is_archived: false }
                : dataItem
            )
          );
        } else {
          setData((prevData) =>
            prevData.map((dataItem) =>
              selectedIds.includes(dataItem.id)
                ? { ...dataItem, [field]: booleanValue }
                : dataItem
            )
          );
        }

        dispatch({
          type: "ALERT_SUCCESS",
          message: `${model.verbose_name} - Object(s): ${selectedIds} Updated`,
        });
        if (field[0] === "is_read") {
          setCount(response.data.count);
        }
      })
      .catch((err) => {
        console.log(err);
        // setError(err);
      });

    setSelected([]);
  };
  return (
    <React.Fragment>
      {ready && model && apiData ? (
        <Content maxWidth={1200} pt={2} pb={4} pad={3} boxShadow={1} br={1}>
          <Flexer>
            <Text w="auto" t="h3" className="breadcrumb-title">
              {model.verbose_name}
            </Text>
            <Breadcrumbs aria-label="breadcrumb">
              <Tooltip text="Back to Dashboard" position="bottom">
                <Link to="/admin">
                  <Text t="body1" className="link-text">
                    Dashboard
                  </Text>
                </Link>
              </Tooltip>
              <Tooltip text={`${formattedAppName} Overview`} position="bottom">
                <Link to={`/admin/model/${appName}`}>
                  <Text t="body1" className="link-text">
                    {formattedAppName}
                  </Text>
                </Link>
              </Tooltip>
              <Text t="body1">{model.verbose_name}</Text>
            </Breadcrumbs>
          </Flexer>
          <Flexer j="fe" gap={12}>
            <Tooltip
              text={`Create ${CapitalizeFirst(model.model_name)}`}
              position="bottom"
            >
              <Link
                to={`/admin/${model.model_name}/control`}
                state={{
                  url: url,
                  keys: keys,
                  appName: appName,
                  model: model,
                  metadata: metadata,
                  id: selected ? selected : null,
                }}
                key={appName}
              >
                <IconButton
                  size="sm"
                  material="add"
                  fontSize="24px"
                  manualHoverColor={palettes.primary.light}
                  className="info-button"
                  iconColor={palettes.info.dark}
                />
              </Link>
            </Tooltip>
            <InfoMenu textItem={model.info_dump} />
          </Flexer>

          {data && metadata && apiData && (
            <ModelTable
              open={open}
              keys={keys}
              data={data}
              metadata={metadata}
              model={model}
              handleEdit={handleNavigateEdit}
              handleDelete={handleDelete}
              handleConfirmDelete={handleConfirmDelete}
              handleClose={handleClose}
              handleMultipleDeleteAction={handleMultipleDeleteAction}
              updateMultipleItems={updateMultipleItems}
              type={type}
            />
          )}
          <Divider mt={4} mb={24} style={{ paddingLeft: 8, paddingRight: 8 }} />
          <RecentActions
            actionsOpen={actionsOpen}
            setActionsOpen={setActionsOpen}
            recentActions={recentActions}
            modelName={model.verbose_name}
            px={1}
          />
        </Content>
      ) : null}
    </React.Fragment>
  );
};

export default ModelPanel;
