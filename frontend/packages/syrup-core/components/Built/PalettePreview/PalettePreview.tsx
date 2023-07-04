import { CSSProperties, FC, Fragment } from 'react';

import { Container, Flexer, Item } from '../../Containers';

import { Base } from '@/theme/base';
import { colors } from '@/theme/common';
import { Text } from '@/components/Elements';

export const PalettePreview = () => {
  const colorSet = Object.entries(colors);

  const groupedColors: any = colorSet.reduce((groups: any, [name, color]) => {
    const titleNames = [
      'slate',
      'smoke',
      'error',
      'warning',
      'success',
      'info',
      'primary',
      'secondary',
      'tertiary',
      'quaternary',
      'dark',
      'light',
    ];

    const baseName = name.replace(/Light|Dark|er$/, '');
    const sectionHeader = titleNames.includes(baseName);

    const groupName: any = sectionHeader
      ? baseName.charAt(0).toUpperCase() + baseName.slice(1)
      : 'Other';

    if (!groups[groupName]) {
      groups[groupName] = [];
    }

    groups[groupName].push({ name, color });

    return groups;
  }, {});

  return (
    <Flexer a="c" j="c" fd="column" mt={40}>
      <Text t="h1" a="c" mb={16}>
        Palette Preview
      </Text>
      <Container fd="row" maxw={1600} gap={36} j="c" a="c" mb={12} mt={0}>
        {Object.entries(groupedColors).map(([groupName, groupColors]: any) => (
          <Fragment>
            <Item fd="column" md={12} lg={groupName === 'Other' ? 10.26 : 5} bs={1} br={6} p="24px">
              <Text t="h3" a="c" mb={8}>
                {groupName}
              </Text>
              <Flexer>
                {groupColors.map(({ name, color }: any) => (
                  <PaletteItem key={name} name={name} color={color} />
                ))}
              </Flexer>
            </Item>
          </Fragment>
        ))}
      </Container>
    </Flexer>
  );
};

const PaletteItem: FC<{ color: CSSProperties['color']; name: string }> = ({ color, name }) => {
  return (
    <Flexer fd="column" j="c" a="c">
      <Base bg={color} w={120} h={80} bs={1} br={6} />
      <Text a="c" mt={2}>
        {name}
      </Text>
      <Text a="c">{color}</Text>
    </Flexer>
  );
};
