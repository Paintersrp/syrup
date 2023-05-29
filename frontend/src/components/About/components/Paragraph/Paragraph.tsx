import React from "react";
import { useSelector } from "react-redux";
import DOMPurify from "dompurify";
import "./Paragraph.css";

import { Flexer } from "../../../../framework/Containers";
import { Text } from "../../../../framework/Base";
import { ButtonBar } from "../../../../framework/Prebuilt";
import ParagraphEdit from "./components/ParagraphEdit";

interface ParagraphProps {
  title: string;
  body?: string;
  editMode?: boolean;
  editState?: boolean;
  setEdit: (editState: boolean) => void;
  adminLink?: string;
  text?: string;
  onUpdate?: (update: any) => void;
  type?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({
  title,
  body,
  editMode,
  editState,
  setEdit,
  adminLink,
  text,
  onUpdate,
  type,
}) => {
  return (
    <Flexer mt={32} mb={32} fd="column">
      {!editState ? (
        <React.Fragment>
          <Flexer j="sb" className="paragraph-section-title fade-in">
            <Text t="h3">{title}</Text>

            {!editState ? (
              <ButtonBar
                editClick={() => setEdit(!editState)}
                adminLink={adminLink}
                tooltipPosition="top"
                text={text}
              />
            ) : null}
          </Flexer>

          {body ? (
            <Text
              t="body1"
              className="fade-in paragraph-body"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(body),
              }}
            />
          ) : null}
        </React.Fragment>
      ) : (
        <div>
          <Flexer j="sb" className="paragraph-section-title fade-in">
            <Text t="h3">{title}</Text>
          </Flexer>
          <ParagraphEdit
            content={{ title, body }}
            onUpdate={onUpdate}
            type={type}
            handleCancel={() => setEdit(!editState)}
          />
        </div>
      )}
    </Flexer>
  );
};

export default Paragraph;
