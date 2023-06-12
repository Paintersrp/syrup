import { FC, Fragment, useState } from 'react';
import DOMPurify from 'dompurify';

import { ButtonBar } from '@/components/Built';
import { Flexer } from '@/components/Containers';
import { BaseProps, Text } from '@/components/Elements';

import { ParagraphEdit } from './ParagraphEdit';
import { ParagraphType } from '../types';
import './css/Paragraph.css';

interface ParagraphProps extends BaseProps {
  data: ParagraphType;
  editMode?: boolean;
  adminLink?: string;
  text?: string;
  onUpdate?: (update: any) => void;
}

export const Paragraph: FC<ParagraphProps> = ({
  data,
  editMode,
  adminLink,
  text,
  onUpdate,
  ...rest
}) => {
  const [edit, setEdit] = useState(false);

  const handleUpdate = (updateData: any) => {
    if (onUpdate) {
      onUpdate(updateData);
    }
    setEdit(false);
  };

  return (
    <Flexer mt={32} mb={32} fd="column" {...rest}>
      {!edit ? (
        <Fragment>
          <Flexer j="sb" className="paragraph-section-title fade-in">
            <Text t="h3">{data.title}</Text>
            {!edit && editMode && (
              <ButtonBar
                editClick={() => setEdit(!edit)}
                adminLink={adminLink}
                tooltipPosition="top"
                text={text}
              />
            )}
          </Flexer>
          {data.body ? (
            <Text
              t="body1"
              className="fade-in paragraph-body"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data.body),
              }}
            />
          ) : null}
        </Fragment>
      ) : (
        <div>
          <Flexer j="sb" className="paragraph-section-title fade-in">
            <Text t="h3">{data.title}</Text>
          </Flexer>
          <ParagraphEdit
            content={data}
            onUpdate={handleUpdate}
            type={adminLink}
            handleCancel={() => setEdit(!edit)}
          />
        </div>
      )}
    </Flexer>
  );
};
