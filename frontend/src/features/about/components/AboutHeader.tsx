import { useState, FC, useEffect } from 'react';

import { ButtonBar, ImageHeader, ImageHeaderEdit } from '@/components/Built';
import { Flexer } from '@/components/Containers';
import { Base, BaseProps } from '@/components/Elements';
import { useApp } from '@/hooks';

import { ImageHeaderType } from '../types';

interface ParagraphProps extends BaseProps {
  data: ImageHeaderType;
}

export const AboutHeader: FC<ParagraphProps> = ({ data, ...rest }) => {
  const { editMode } = useApp();
  const [headerData, setHeaderData] = useState<ImageHeaderType>(data);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setHeaderData(data);
  }, [data]);

  const handleUpdate = (updateData: any) => {
    setHeaderData(updateData);
    setEdit(false);
  };

  return (
    <Base {...rest}>
      {!edit && editMode && (
        <Flexer j="fe">
          <ButtonBar editClick={() => setEdit(!edit)} adminLink="aboutheader" text="About Header" />
        </Flexer>
      )}
      {!edit ? (
        <ImageHeader header={`About ${headerData.title}`} src={headerData.image} fade />
      ) : (
        <ImageHeaderEdit
          data={headerData}
          onUpdate={handleUpdate}
          handleCancel={() => setEdit(!edit)}
        />
      )}
    </Base>
  );
};
