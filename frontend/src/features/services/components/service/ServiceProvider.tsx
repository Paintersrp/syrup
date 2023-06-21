import { FC, ReactNode, useEffect, useState, createContext, useContext } from 'react';

import { Container, Flexer, Surface } from '@/components/Containers';
import { BaseProps } from '@/theme/base';

import { ServiceContent, ServiceType } from '../../types';
import { useEditModeStore } from '@/stores/editmode';
import { FormGenerator } from '@/features/editable/components/FormGenerator';
import { ButtonBar } from '@/features/editable';

type ServiceProviderProps = BaseProps & {
  data: ServiceType;
  fullData: ServiceContent;
  children: ReactNode;
};

type ServiceContextType = {
  data: ServiceType;
  fullData: ServiceContent;
};

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const ServiceProvider: FC<ServiceProviderProps> = ({
  data,
  fullData,
  children,
  ...rest
}) => {
  const { editMode }: any = useEditModeStore();
  const [serviceData, setServiceData] = useState(data);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setServiceData(data);
  }, [data]);

  const updateServiceProvider = (updatedData: ServiceType) => {
    setServiceData(updatedData);
    setEditing(false);
  };

  return (
    <ServiceContext.Provider value={{ data: serviceData, fullData }}>
      <Surface
        maxWidth={1200}
        px={4}
        py={4}
        j="c"
        a="c"
        mt={24}
        mb={24}
        boxShadow={0}
        br={6}
        {...rest}
      >
        {!editing && editMode && (
          <ButtonBar
            justifyContent="flex-end"
            editClick={() => setEditing(!editing)}
            adminLink="servicetier"
            text="Service Provider"
            obj={serviceData.id}
            mb={8}
          />
        )}
        {!editing ? (
          <Container j="fs" a="fs" mb={24}>
            {children}
          </Container>
        ) : (
          <Flexer j="c" mb={24}>
            <FormGenerator
              title="Edit Service Provider Header Item"
              endpoint={`servicetier/${serviceData.id}/`}
              data={serviceData}
              onUpdate={updateServiceProvider}
              handleCancel={() => setEditing(!editing)}
              width="50%"
              excludeKeys={['id', 'image', 'features', 'supported_sites', 'price', 'service_title']}
              multilineKeys={['paragraph_one', 'paragraph_two', 'paragraph_three']}
              px={3}
              py={3}
              br={8}
              placement="bottom"
              imageMixin
              boxShadow
            />
          </Flexer>
        )}
      </Surface>
    </ServiceContext.Provider>
  );
};

export const useServiceData = (): ServiceContextType => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useAboutData must be used within a ServiceProviderContainer');
  }
  return context;
};
