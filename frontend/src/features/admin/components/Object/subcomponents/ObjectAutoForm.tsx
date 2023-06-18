import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { axios } from '@/lib/api';
import { Container, Flexer, Item, Surface } from '@/components/Containers';
import { Divider, Text, Tooltip } from '@/components/Elements';
import { Button } from '@/components/Buttons';

import InfoMenu from '@/features/admin/components/Model/subcomponents/InfoMenu';
import getByType from './getByType';
import ObjectPreview from './ObjectPreview';
import { useBreakpoint } from '@/hooks';
import { colors } from '@/theme/common';

interface ObjectAutoFormProps {
  endpointUrl: string | null;
  data?: any;
  handleUpdate: () => void;
  handleModalUpdate?: () => void;
  variant?: string;
  handleClose?: () => void;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const ObjectAutoForm: React.FC<ObjectAutoFormProps> = ({
  endpointUrl,
  data = {},
  handleUpdate,
  handleModalUpdate,
  variant = 'full',
  handleClose,
  refresh,
  setRefresh,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isSmallScreen = useBreakpoint('xs');

  const [ready, setReady] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);
  const [selectedModelName, setSelectedModelName] = useState('');

  const [formData, setFormData] = useState(data);
  const [modelMetadata, setModelMetadata] = useState<any>({});
  const [fieldMetadata, setFieldMetadata] = useState<any>({});
  const [componentPreviewData, setComponentPreviewData] = useState({});

  const [url, setUrl] = useState([]);
  const [keys, setKeys] = useState([]);
  const [appName, setAppName] = useState([]);
  const [model, setModel] = useState<any>([]);
  const [metadata, setMetadata] = useState<any>([]);

  const [newImage, setNewImage] = useState<any>(null);
  const [newImageName, setNewImageName] = useState(null);

  useEffect(() => {
    setReady(false);
    if (!location.state) {
      axios
        .get(`/get_models${endpointUrl}`)
        .then((response) => {
          setUrl(response.data.url);
          setAppName(response.data.app_name);
          setKeys(response.data.keys);
          setMetadata(response.data.metadata);
          setModel(response.data);
          setReady(true);
        })
        .catch((error) => console.log(error));
    } else {
      setUrl(location.state.url);
      setAppName(location.state.appName);
      setKeys(location.state.keys);
      setMetadata(location.state.metadata);
      setModel(location.state.model);
      setReady(true);
    }
  }, []);

  useEffect(() => {
    axios.get(`/get_metadata${endpointUrl}`).then((response) => {
      setFieldMetadata(response.data.fields);
      setModelMetadata(response.data);
    });
  }, []);

  useEffect(() => {
    setReady(false);
    setRefresh(false);
    axios
      .get(`/get_models${endpointUrl}`)
      .then((response) => {
        setUrl(response.data.url);
        setAppName(response.data.app_name);
        setKeys(response.data.keys);
        setMetadata(response.data.metadata);
        setModel(response.data);
        setReady(true);
      })
      .catch((error) => console.log(error));
  }, [refresh]);

  const handleModelNameChange = (model_name: any) => {
    setSelectedModelName(model_name);
    handleUpdatePreview(model_name, formData['query_params']);
  };

  useEffect(() => {
    if (modelMetadata.modelName === 'ComponentObj') {
      if (selectedModelName) {
        handleUpdatePreview(selectedModelName, formData['query_params']);
      } else {
        handleUpdatePreview(formData['content'], formData['query_params']);
      }
    }
  }, [formData['query_params']]);

  const handleUpdatePreview = (model_name: any, query_params: any) => {
    setPreviewReady(false);
    if (model_name !== 'None') {
      axios
        .get('preview-data/', {
          params: {
            model_name: model_name,
            query_params: query_params,
          },
        })
        .then((response) => {
          setComponentPreviewData(response.data.data);
          setSelectedModelName(response.data.model_name);
          setTimeout(() => {
            setPreviewReady(true);
          }, 250);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleImageChange = (event: any) => {
    formData.image = event.target.files[0];
    setNewImage(URL.createObjectURL(event.target.files[0]));
    setNewImageName(event.target.files[0].name);
  };

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    console.log('event', name, value, type, checked);
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]:
        type === 'checkbox'
          ? checked
          : type === 'file'
          ? e.target.files[0]
          : name === 'content'
          ? value !== 'None Selected'
            ? parseInt(value)
            : 'None Selected'
          : value,
    }));
  };

  const handleQuillChange = (fieldName: any, fieldValue: any) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [fieldName]: fieldValue,
    }));
  };

  const handleComponentsChange = (fieldName: any, newObjects: any) => {
    const updatedFormData = { ...formData };
    updatedFormData[fieldName] = newObjects;
    setFormData(updatedFormData);
  };

  const handleManyToManyChange = (fieldName: any, fieldValue: any) => {
    if (
      fieldName === 'features' ||
      fieldName === 'supported_sites' ||
      fieldName === 'responsibilities' ||
      fieldName === 'requirements'
    ) {
      const newFeatures = formData[fieldName] ? [...formData[fieldName]] : [];
      newFeatures.push({ detail: fieldValue });
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        [fieldName]: newFeatures,
      }));
    } else if (fieldName === 'items') {
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        [fieldName]: [...prevFormData[fieldName], fieldValue],
      }));
    } else {
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        [fieldName]: fieldValue,
      }));
    }
  };

  const routeBackToModel = () => {
    if (variant === 'modal') {
      if (handleClose) {
        handleClose();
      }
    } else if (variant === 'full') {
      navigate(`/admin/${model.model_name}/`, {
        state: {
          url: url,
          keys: keys,
          appName: appName,
          model: model,
          metadata: metadata,
        },
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formDataWithoutId: any = {};
    for (const [key, value] of Object.entries(formData)) {
      if (key !== 'id') {
        formDataWithoutId[key] = value;
      }
    }

    if (Object.keys(data).length === 0) {
      if (endpointUrl) {
        try {
          const response = await axios.post(endpointUrl, formDataWithoutId);
          routeBackToModel();
          handleUpdate();
          dispatch({
            type: 'ALERT_SUCCESS',
            message: `${model.verbose_name} Object - Created ${model.verbose_name}`,
          });
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      try {
        const response = await axios.patch(`${endpointUrl}${data.id}/`, formDataWithoutId);

        routeBackToModel();
        handleUpdate();
        dispatch({ type: 'ALERT_SUCCESS', message: 'Object Updated' });
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (!ready) {
    return null;
  }

  return (
    <Surface
      boxShadow={1}
      minHeight={isSmallScreen ? 400 : 600}
      br={1.5}
      a="c"
      j="c"
      mt={2}
      mb={1}
      py={1.5}
      className="fade-in"
      innerStyle={{ minWidth: isSmallScreen ? 370 : 800 }}
    >
      {modelMetadata.info_dump && <InfoMenu textItem={modelMetadata.info_dump} />}
      <Text t="h3" a="c" fw="bold" mb={12}>
        {`${Object.keys(data).length === 0 ? 'Create' : 'Update'} ${
          modelMetadata.autoFormLabel || modelMetadata.verboseName
        } Object`}
      </Text>
      <Text t="body1" s="0.85rem" a="c" mb={6}>
        {modelMetadata.longDescription}
      </Text>

      <Divider mt={24} mb={32} />

      <Container justify={modelMetadata.preview ? 'flex-start' : 'center'}>
        <Item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={
            modelMetadata.preview && modelMetadata.modelName === 'ComponentObj'
              ? 12
              : modelMetadata.preview
              ? 7
              : 10
          }
        >
          <Container justify="center">
            {fieldMetadata &&
              metadata &&
              Object.keys(fieldMetadata).map((fieldName) => {
                if (
                  fieldName === 'id' ||
                  fieldName === 'created_at' ||
                  fieldName === 'updated_at' ||
                  fieldName === 'blacklisted_at' ||
                  fieldName === 'last_login' ||
                  fieldName === 'date_joined' ||
                  fieldName === 'subscribed_on' ||
                  fieldName === 'password' ||
                  fieldName === 'salt' ||
                  fieldName === 'question_sets' ||
                  fieldName === 'questions' ||
                  fieldName === 'answer_choices' ||
                  fieldName === 'author' ||
                  fieldName === 'set_name'
                ) {
                  return null;
                }

                const { verbose_name } = metadata[fieldName]
                  ? metadata[fieldName]
                  : fieldMetadata[fieldName].help_text;

                const inputElement = getByType({
                  fieldMetadata,
                  fieldName,
                  modelMetadata,
                  verboseName: verbose_name,
                  formData,
                  setFormData,
                  handleInputChange,
                  handleManyToManyChange,
                  handleImageChange,
                  handleQuillChange,
                  handleComponentsChange,
                  handleModelNameChange,
                  handleModalUpdate,
                  newImage,
                  newImageName,
                });

                if (inputElement) {
                  return inputElement;
                }

                return null;
              })}

            <Flexer j="c" a="c" mt={48} mb={16} gap={12} style={{ order: 9999 }}>
              <Tooltip
                text={`${Object.keys(data).length === 0 ? 'Create' : 'Update'} Object`}
                position="bottom"
              >
                <Button
                  w={80}
                  onClick={handleSubmit}
                  endIcon="check"
                  color={colors.success.main}
                  className="success-button"
                >
                  {Object.keys(data).length === 0 ? 'Create' : 'Update'}
                </Button>
              </Tooltip>
              <Tooltip text="Cancel Creation" position="bottom">
                <Button
                  onClick={variant === 'full' ? routeBackToModel : handleClose}
                  w={80}
                  endIcon="close"
                  color={colors.error.main}
                  className="error-button"
                >
                  Cancel
                </Button>
              </Tooltip>
            </Flexer>
          </Container>
        </Item>

        {modelMetadata.preview ? (
          <Item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={modelMetadata.modelName === 'ComponentObj' ? 12 : 5}
            style={{
              justifyContent: 'flex-start',
              display: 'flex',
              paddingTop: isSmallScreen ? 16 : 0,
            }}
          >
            <Flexer fd="column" a="c" j="c">
              <Text t="h3" a="c">
                Component Preview
              </Text>
              <ObjectPreview
                modelName={modelMetadata.modelName}
                formData={formData}
                newImage={newImage}
              />
            </Flexer>
          </Item>
        ) : null}
      </Container>

      <Divider mb={16} mt={24} />

      {modelMetadata.pagesAssociated && (
        <React.Fragment>
          <Text a="c" t="h3">
            Associated Pages
          </Text>
          <Flexer mb={8} j="c" mt={8} gap={12}>
            {Object.entries(modelMetadata.pagesAssociated).map(([page, url]: any, index) => (
              <Tooltip key={page} text={`View ${page} Page`} position="bottom">
                <Link to={url}>
                  <Button startIcon="link" w={100}>
                    {page}
                  </Button>
                </Link>
              </Tooltip>
            ))}
          </Flexer>
        </React.Fragment>
      )}
    </Surface>
  );
};

export default ObjectAutoForm;
