import { Flexer, Item } from '@/components/Containers';
import { HelpText } from '@/components/Elements';
import { axios } from '@/lib/api';
import React, { useEffect, useState } from 'react';
import ForeignKeySelect from './ForeignKeySelect';

interface ForeignKeyTypeProps {
  formData: any;
  fieldName: string;
  verboseName: string;
  handleInputChange: (fieldName: string, value: any) => void;
  xsColumnCount: number;
  mdColumnCount: number;
  helpText?: string;
}

const ForeignKeyType: React.FC<ForeignKeyTypeProps> = ({
  formData,
  fieldName,
  verboseName,
  handleInputChange,
  xsColumnCount,
  mdColumnCount,
  helpText,
}) => {
  const [data, setData] = useState<any[] | undefined>();

  const endpointMappings: Record<string, string> = {
    service_tier: '/servicetier/',
    job: '/jobposting/',
    user: '/user/',
    labels: '/servicetablelabels/',
    social: '/socials/',
    contact_info: '/contactinformation/',
    hero_block: '/heroblock/',
    title_block: '/titleblock/',
    element_set: '/elementset/',
    'FAQ Question': '/faqquestion/',
    'FAQ Question Category': '/faqquestioncategory/',
    'FAQ Answer': '/faqanswer/',
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await axios.get(endpointMappings[fieldName] || `/${fieldName}/`);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [fieldName, verboseName]);

  return (
    <Item
      xs={xsColumnCount}
      md={mdColumnCount}
      style={{
        display: 'flex',
        justifyContent: 'center',
        paddingRight: 8,
        paddingLeft: 8,
        width: '100%',
      }}
    >
      <Flexer fd="column">
        {data && (
          <React.Fragment>
            <HelpText>{helpText || verboseName}</HelpText>
            <ForeignKeySelect
              formData={formData}
              fieldName={fieldName}
              verboseName={verboseName}
              handleInputChange={handleInputChange}
              choices={data}
            />
          </React.Fragment>
        )}
      </Flexer>
    </Item>
  );
};

export default ForeignKeyType;
