import { CSSProperties, FC, FormEvent, useState } from 'react';

import { useAlertStore } from '@/stores/alert';
import { ImageMixin } from './ImageMixin';
import { IconMixin } from './IconMixin';

import { ConfirmCancelBar } from './ConfirmCancelBar';
import { ErrorDisplay } from './ErrorDisplay';
import { BaseProps, Container, Input, Item, Surface, Text, useBreakpoint } from 'sy-core';
import { axios } from '@/lib/axios';
import { validateForm } from '../api/validateForm';

interface FormGeneratorProps extends BaseProps {
  endpoint: string;
  data: any;
  onUpdate: any;
  title?: string;
  handleCancel: () => void;
  handleManyToManyChange?: () => void;
  width?: CSSProperties['width'];
  excludeKeys?: string[];
  multilineKeys?: string[];
  smallKeys?: string[];
  titleBlockMixin?: boolean;
  iconMixin?: boolean;
  imageMixin?: boolean;
  boxShadow?: boolean;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  px?: number;
  py?: number;
  fade?: boolean;
}

export const FormGenerator: FC<FormGeneratorProps> = ({
  endpoint,
  data,
  onUpdate,
  title,
  handleCancel,
  handleManyToManyChange,
  width = '100%',
  excludeKeys = [],
  multilineKeys = [],
  smallKeys = [],
  titleBlockMixin = false,
  iconMixin = false,
  imageMixin = false,
  boxShadow = false,
  placement = 'bottom',
  px: paddingX = 3,
  py: paddingY = 0,
  fade = false,
  ...rest
}) => {
  // add validation
  const isSmallScreen = useBreakpoint('sm');
  const { showAlert } = useAlertStore();

  const [errors, setErrors] = useState<any>([]);
  const [state, setState] = useState({ ...data });

  // move into imagemixin?
  const [newImage, setNewImage] = useState<any>(null);
  const [newImageName, setNewImageName] = useState<any>(null);

  const handleChange = (e: any) => {
    if (e.target.name === 'image') {
      setState({
        ...state,
        [e.target.name]: e.target.files[0],
      });
      setNewImage(URL.createObjectURL(e.target.files[0]));
      setNewImageName(e.target.files[0].name);
    } else {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    }
  };

  //merge handler
  const handleSwitchChange = (event: any) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors(validateForm(state));

    if (errors.length !== 0) {
      return errors;
    }

    try {
      const res = await axios.patch(endpoint, state);
      onUpdate(res.data);
      showAlert('success', 'Data Updated');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Surface
      boxShadow={boxShadow ? 1 : 0}
      px={paddingX}
      py={paddingY}
      style={{ margin: '0 auto !important', width: width, borderRadius: 8 }}
      className={`${fade ? 'fade-in' : ''}`}
      {...rest}
    >
      {title ? (
        <Text t="h4" fw="bold" mb={12} a="c">
          {title}
        </Text>
      ) : null}
      <form onSubmit={handleSubmit}>
        {imageMixin ? (
          <ImageMixin
            handleChange={handleChange}
            formData={state}
            newImage={newImage}
            newImageName={newImageName}
          />
        ) : null}
        <Container>
          {Object.keys(state).map((key) => {
            if (!excludeKeys.includes(key)) {
              return (
                <Item
                  key={`form-${key}`}
                  xs={12}
                  sm={!smallKeys.includes(key) ? 12 : 6}
                  style={{ marginTop: 4 }}
                >
                  <Input
                    size="medium"
                    id={key}
                    name={key}
                    value={state[key]}
                    onChange={handleChange}
                    multiline={multilineKeys.includes(key)}
                    helpText={
                      key === 'who_we_are'
                        ? 'Who We Are'
                        : key === 'looking_for'
                        ? 'Looking For'
                        : key === 'why_apply'
                        ? 'Why Apply'
                        : key === 'firstName'
                        ? 'First Name'
                        : key === 'lastName'
                        ? 'Last Name'
                        : key.charAt(0).toUpperCase() + key.slice(1)
                    }
                    rows={isSmallScreen ? 4 : 3}
                  />
                </Item>
              );
            }
          })}
        </Container>
        {/* {titleBlockMixin ? (
            <>
              <TitleBlockMixin
                handleChange={handleChange}
                formData={formData}
              />
            </>
          ) : null}*/}
        {iconMixin && <IconMixin fieldName="icon" handleChange={handleChange} formData={state} />}
        <ConfirmCancelBar
          handleConfirm={handleSubmit}
          handleCancel={handleCancel}
          position={placement}
          mt={8}
        />
      </form>
      {errors && <ErrorDisplay errors={errors} setErrors={setErrors} />}
    </Surface>
  );
};
