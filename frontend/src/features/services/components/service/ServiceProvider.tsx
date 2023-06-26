import { FC, ReactNode, useEffect, useState, createContext, useContext } from 'react';

import { Container, Surface } from '@/components/Containers';
import { Editable } from '@/features/editable';
import { BaseProps } from '@/theme/base';

import { ServiceContent, ServiceType } from '../../types';

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
  const [serviceData, setServiceData] = useState(data);

  useEffect(() => {
    setServiceData(data);
  }, [data]);

  const updateServiceProvider = (updatedData: ServiceType) => {
    setServiceData(updatedData);
  };

  const editConfig = {
    name: 'process',
    data: serviceData,
    endpoint: `servicetier/${serviceData.id}/`,
    editMenuAlign: 'flex-start',
    onUpdate: updateServiceProvider,
    id: serviceData.id,
    excludeKeys: ['id', 'image', 'features', 'supported_sites', 'price', 'service_title'],
    multilineKeys: ['paragraph_one', 'paragraph_two', 'paragraph_three'],
    formSettings: {
      width: '100%',
      px: 3,
      py: 3,
    },
    ...rest,
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
        <Editable {...editConfig}>
          <Container j="fs" a="fs" mb={24}>
            {children}
          </Container>
        </Editable>
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
