import { FC, useEffect, useState } from 'react';

import { Flexer } from '@/components/Containers';
import { ButtonBar } from '@/components/Built';
import { Text } from '@/components/Elements';
import { useApp } from '@/hooks';
import { colors } from '@/theme/common';

type ServicePriceProps = {
  data: any;
};

export const ServicePrice: FC<ServicePriceProps> = ({ data }) => {
  const { editMode } = useApp();
  const [priceData, setPriceData] = useState(data);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setPriceData(data);
  }, [data]);

  const updatePrice = (updatePrice: any) => {
    setPriceData(updatePrice);
    setEditing(false);
  };

  return (
    <Flexer fd="column" a="c" j="c" mb={64}>
      {
        !editing ? (
          <Text t="h2" mb={8} fw="bold" a="c" u uo={6} c={colors.primary.main}>
            ${priceData.price}/mo
          </Text>
        ) : null
        // <ServicePriceEdit
        //   price={priceData}
        //   updatePrice={updatePrice}
        //   handleCancel={() => setEditing(!editing)}
        // />
      }
      {!editing && editMode ? (
        <ButtonBar
          editClick={() => setEditing(!editing)}
          justifyContent="center"
          adminLink="servicetier"
          text="Service Tier"
          obj={priceData.id}
        />
      ) : null}
    </Flexer>
  );
};
