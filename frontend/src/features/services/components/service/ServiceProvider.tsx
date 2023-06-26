import { FC, ReactNode, createContext, useContext } from 'react';

import { Container, Surface } from '@/components/Containers';
import { Editable, useEditable } from '@/features/editable';
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
  const [editableData, editConfig] = useEditable({
    name: 'process',
    endpoint: `servicetier/`,
    data: data,
    id: data.id,
    editMenuAlign: 'flex-start',
    excludeKeys: ['id', 'image', 'features', 'supported_sites', 'price', 'service_title'],
    multilineKeys: ['paragraph_one', 'paragraph_two', 'paragraph_three'],
    formSettings: {
      width: '100%',
      px: 3,
      py: 3,
    },
  });

  return (
    <ServiceContext.Provider value={{ data: editableData, fullData }}>
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
