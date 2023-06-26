import { FC, useEffect, useState } from 'react';

import { Editable } from '@/features/editable';
import { SectionHeader, SectionHeaderContent } from '@/components/Built';
import { IconButton } from '@/components/Buttons';
import { Container, Flexer, Item, Surface } from '@/components/Containers';
import { Link, Text, Tooltip } from '@/components/Elements';
import { Icon } from '@/components/Media';
import { Base } from '@/theme/base';

import { BenefitType } from '../../types';

type BenefitProps = {
  benefit: BenefitType;
};

export const Benefit: FC<BenefitProps> = ({ benefit }) => {
  const [data, setData] = useState(benefit);

  useEffect(() => {
    setData(benefit);
  }, [benefit]);

  const updateBenefit = (updateBenefit: BenefitType) => {
    setData(updateBenefit);
  };

  const editConfig = {
    name: 'process',
    data: data,
    endpoint: `benefits/${data.id}/`,
    editMenuPosition: 'bottom',
    onUpdate: updateBenefit,
    id: data.id,
    formSettings: {
      width: 325,
    },
  };

  return (
    <Editable {...editConfig}>
      <Surface boxShadow={1} maxWidth={325} minw={325} j="c" a="c" br={8} px={1.5} py={1.5}>
        <Flexer j="c">
          <Icon icon={data.icon} size="28px" mb={4} />
        </Flexer>
        <Text t="h4" a="c" mt={8} s="1.5rem" fw={700}>
          {data.title}
        </Text>
        <Text t="body1" mt={4} a="c" s="0.95rem" c="#6B6B6B" style={{ minHeight: 75 }}>
          {data.description}
        </Text>
        {benefit.buttonText && (
          <Flexer j="fe" a="c">
            <Tooltip text={`View ${data.buttonText}`} position="bottom">
              <Link to={`/${benefit.page_link}`}>
                <IconButton size="tiny" icon="link" palette="secondary" variant="hover" />
              </Link>
            </Tooltip>
          </Flexer>
        )}
      </Surface>
    </Editable>
  );
};

type BenefitsProps = {
  benefits: BenefitType[];
  headerData: [SectionHeaderContent];
};

export const Benefits: FC<BenefitsProps> = ({ benefits, headerData }) => {
  return (
    <Base pt={64} pb={64} w="100%">
      <SectionHeader headerData={headerData[0]} formTitle="Edit Processes Header" />
      <Container mt={12} j="c">
        {benefits.map((benefit, index) => {
          return (
            <Item key={`benefit-${index}`} xs={12} sm={6} md={6} lg={4} pt={12} pb={12}>
              <Benefit benefit={benefit} />
            </Item>
          );
        })}
      </Container>
    </Base>
  );
};
