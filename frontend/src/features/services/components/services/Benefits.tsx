import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ButtonBar, SectionHeader, SectionHeaderContent } from '@/components/Built';
import { IconButton } from '@/components/Buttons';
import { Container, Flexer, Item, Surface } from '@/components/Containers';
import { Base, Text, Tooltip } from '@/components/Elements';
import { FormGenerator } from '@/components/Form';
import { MaterialIcon } from '@/components/Media';
import { palettes } from '@/utils';

import { BenefitType } from '../../types';

type BenefitProps = {
  benefit: BenefitType;
  editMode: boolean;
};

export const Benefit: FC<BenefitProps> = ({ benefit, editMode }) => {
  const [data, setData] = useState(benefit);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setData(benefit);
  }, [benefit]);

  const updateBenefit = (updateBenefit: BenefitType) => {
    setData(updateBenefit);
    setEditing(false);
  };

  return (
    <>
      {!editing ? (
        <Surface boxShadow={1} maxWidth={325} j="c" a="c" br={8} px={1.5} py={1.5}>
          <Flexer j="c">
            <MaterialIcon icon={data.icon} color={palettes.primary.main} size="28px" mb={4} />
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
                  <IconButton
                    size="t"
                    material="link"
                    className="secondary-button"
                    iconColor={palettes.secondary.main}
                    fontSize="21px"
                  />
                </Link>
              </Tooltip>
            </Flexer>
          )}
          {!editing && editMode && (
            <ButtonBar
              editClick={() => setEditing(!editing)}
              adminLink="benefits"
              text="Benefits"
              mt={8}
            />
          )}
        </Surface>
      ) : (
        <FormGenerator
          title="Edit Benefit Item"
          endpoint={`benefits/${benefit.id}/`}
          data={data}
          onUpdate={updateBenefit}
          handleCancel={() => setEditing(!editing)}
          width={325}
          excludeKeys={['id', 'icon', 'page_link']}
          multilineKeys={['description']}
          px={3}
          py={3}
          br={8}
          placement="bottom"
          iconMixin
          boxShadow
          j="c"
          a="c"
        />
      )}
    </>
  );
};

type BenefitsProps = {
  benefits: BenefitType[];
  headerData: [SectionHeaderContent];
  editMode: boolean;
};

export const Benefits: FC<BenefitsProps> = ({ benefits, headerData, editMode }) => {
  return (
    <Base pt={64} pb={64} w="100%">
      <SectionHeader headerData={headerData[0]} formTitle="Edit Processes Header" />
      <Container mt={12} j="c">
        {benefits.map((benefit, index) => {
          return (
            <Item key={`benefit-${index}`} xs={12} sm={6} md={6} lg={4} pt={12} pb={12}>
              <Benefit benefit={benefit} editMode={editMode} />
            </Item>
          );
        })}
      </Container>
    </Base>
  );
};
