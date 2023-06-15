import { FC, useEffect, useState } from 'react';

import { ButtonBar } from '@/components/Built';
import { Base } from '@/components/Elements';
import { IconTextItem } from '@/components/Media';

type ServiceProcessTextProps = {
  textItem: any;
  index: number;
  editMode: boolean;
};

export const ServiceProcessText: FC<ServiceProcessTextProps> = ({ textItem, index, editMode }) => {
  const [data, setData] = useState(textItem);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setData(textItem);
  }, [textItem]);

  const updateProcess = (updateProcess: any) => {
    setData(updateProcess);
    setEditing(false);
  };

  return (
    <>
      <Base>
        {
          !editing ? (
            <IconTextItem
              iconSize="24px"
              icon={data.icon}
              text={data.title}
              subtext={data.description}
            />
          ) : null
          //   <ProcessTextEdit
          //     item={data}
          //     updateProcess={updateProcess}
          //     handleCancel={() => setEditing(!editing)}
          //   />
        }
      </Base>
      {!editing && editMode && (
        <ButtonBar
          editClick={() => setEditing(!editing)}
          adminLink="processtextitem"
          text="Process Text Item"
          obj={data.id}
        />
      )}
    </>
  );
};
