import { useState, FC } from 'react';

import { ButtonBar, ImageHeader, ImageHeaderEdit } from '@/components/Built';
import { Flexer } from '@/components/Containers';
import { Base, BaseProps } from '@/components/Elements';
import { ImageHeaderType } from '../types';

interface ParagraphProps extends BaseProps {
  data: ImageHeaderType;
  editMode?: boolean;
  onUpdate: (update: any) => void;
  setError: any;
}

export const AboutHeader: FC<ParagraphProps> = ({
  data,
  editMode,
  onUpdate,
  setError,
  ...rest
}) => {
  const [edit, setEdit] = useState(false);

  const handleUpdate = (updateData: any) => {
    onUpdate(updateData);
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
        <ImageHeader header={`About ${data.title}`} src={data.image} fade />
      ) : (
        <ImageHeaderEdit
          data={data}
          onUpdate={handleUpdate}
          handleCancel={() => setEdit(!edit)}
          setError={setError}
        />
      )}
    </Base>
  );
};
