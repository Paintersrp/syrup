import React from "react";
import DOMPurify from "dompurify";
import "./Paragraph.css";

import { useSelector } from "react-redux";
import { Flexer } from "../../../../framework/Containers";
import { Text } from "../../../../framework/Base";

interface ParagraphProps {
  title: string;
  body?: string;
  //   editState: boolean;
  //   setEdit: (editState: boolean) => void;
  //   editMode: boolean;
  //   adminLink: string;
  //   text?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ title, body }) => {
  const auth = useSelector<any>((state) => state.auth);

  return (
    <Flexer mt={16} mb={32} fd="column">
      <Flexer j="sb" className="paragraph-section-title fade-in">
        <Text t="h3">{title}</Text>
        Edit/Admin
        {/* {!editState && editMode ? (
            <EditDeleteButtonMenu
              hideDelete
              editClick={() => setEdit(!editState)}
              adminLink={adminLink}
              text={text}
            />
          ) : null} */}
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
    </Flexer>
  );
};

export default Paragraph;
