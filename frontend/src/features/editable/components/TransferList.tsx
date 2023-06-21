import { FC, useEffect, useState } from 'react';
import { css } from '@emotion/react';

import { Flexer } from '@/components/Containers';
import { List, Text } from '@/components/Elements';
import { IconTextItem } from '@/components/Media';
import { verboseSource } from '@/utils';

export const transferListCx = {
  mtmTransferList: css({
    width: '100%',
    maxHeight: 260,
    borderRadius: 4,
    scrollbarWidth: 'thin',
    scrollbarColor: '#ccc transparent',
    '&::-webkit-scrollbar': {
      width: 10,
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#ccc',
      borderRadius: 4,
    },
    '&::-moz-scrollbar': {
      width: 10,
      height: 10,
      background: '#ccc',
      borderRadius: 4,
    },
    '&::-moz-scrollbar-thumb': {
      background: '#ccc',
      borderRadius: 4,
    },
  }),
};

interface TransferListProps {
  fieldName: string;
  selectedOptions: any[];
  choices: any[];
  handleComponentsChange: (fieldName: string, fieldValue: any[]) => void;
}

export const TransferList: FC<TransferListProps> = ({
  fieldName,
  selectedOptions,
  choices,
  handleComponentsChange,
}) => {
  const [left, setLeft] = useState<any[]>(choices);
  const [right, setRight] = useState<any[]>(selectedOptions);

  useEffect(() => {
    const filteredChoices = choices.filter((choice) => {
      return !selectedOptions.some((selected) => selected.id === choice.id);
    });
    setLeft(filteredChoices);
  }, [choices, selectedOptions]);

  const handleRightClick = (item: any) => () => {
    setLeft(left.filter((i) => i.id !== item.id));
    setRight([...right, item]);
    handleComponentsChange(fieldName, [...right, item]);
  };

  const handleLeftClick = (item: any) => () => {
    setRight(right.filter((i) => i.id !== item.id));
    setLeft([...left, item]);
    handleComponentsChange(
      fieldName,
      right.filter((i) => i.id !== item.id)
    );
  };

  return (
    <Flexer mt={24} fd="column">
      <Flexer j="sb" grow gap={18}>
        <Flexer bs={1} fd="column">
          {left && left.length > 0 ? (
            <List
              px={0}
              py={0}
              boxShadow={1}
              a="c"
              j="c"
              maxh={260}
              w="100%"
              br={4}
              css={transferListCx.mtmTransferList}
              innerStyle={{ overflow: 'auto' }}
            >
              <Text t="h3" a="c">
                Available
              </Text>
              {left.map((item) => {
                return (
                  <IconTextItem
                    onClick={handleRightClick(item)}
                    key={item.id}
                    icon="arrow_forward"
                    text={verboseSource(fieldName, item)}
                    pt={4}
                    pb={4}
                    ml={8}
                  />
                );
              })}
            </List>
          ) : (
            <List style={{ maxHeight: 300, marginRight: 8 }}>
              <IconTextItem text="All Options Selected" />
            </List>
          )}
        </Flexer>

        <Flexer fd="column">
          {right && right.length > 0 ? (
            <List
              px={0}
              py={0}
              boxShadow={1}
              css={transferListCx.mtmTransferList}
              innerStyle={{ overflow: 'auto', flexGrow: 'grow' }}
            >
              <Text t="h3" a="c">
                Selected
              </Text>
              {right.map((item, index) => (
                <IconTextItem
                  onClick={handleLeftClick(item)}
                  key={item.id}
                  icon="arrow_forward"
                  text={verboseSource(fieldName, item)}
                  pt={4}
                  pb={4}
                  ml={8}
                />
              ))}
            </List>
          ) : (
            <List
              css={transferListCx.mtmTransferList}
              px={0}
              py={0}
              boxShadow={1}
              innerStyle={{ overflow: 'auto' }}
            >
              <IconTextItem text="All Options Selected" icon="check" pt={4} pb={4} ml={8} />
            </List>
          )}
        </Flexer>
      </Flexer>
    </Flexer>
  );
};
