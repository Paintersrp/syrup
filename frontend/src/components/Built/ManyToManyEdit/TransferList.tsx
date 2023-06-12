import React, { useEffect, useState } from 'react';
import './TransferList.css';

import { verboseSource } from '@/utils';
import { Flexer } from '@/components/Containers';
import { List, Text } from '@/components/Elements';
import { IconTextItem } from '@/components/Media';

interface TransferListProps {
  fieldName: string;
  selectedOptions: any[];
  choices: any[];
  handleComponentsChange: (fieldName: string, fieldValue: any[]) => void;
}

const TransferList: React.FC<TransferListProps> = ({
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
              className="mtm-transfer-list"
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
              className="mtm-transfer-list"
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
              className="mtm-transfer-list"
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

export default TransferList;
