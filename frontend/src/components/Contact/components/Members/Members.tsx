import React from "react";

import { Text } from "../../../../framework/Base";
import { Container, Flexer } from "../../../../framework/Containers";
import { ButtonBar } from "../../../../framework/Prebuilt";
import { MemberData } from "../../Contact";
import { Member } from "./components";

interface MembersProps {
  membersData: MemberData[];
  editMode: boolean;
}

const Members: React.FC<MembersProps> = ({ membersData, editMode }) => {
  return (
    <Flexer j="c" mt={40}>
      <Flexer j="c" a="c" fd="column" mb={24} style={{ maxWidth: 900 }}>
        <Text
          t="h2"
          mb={36}
          s="1.8rem"
          style={{ borderBottom: "1px solid black" }}
        >
          Company Members
        </Text>
        {editMode && <ButtonBar adminLink="teammember" text="Members" />}
        <Container justify="center">
          {membersData.map((member) => (
            <Member member={member} editMode={editMode} key={member.id} />
          ))}
        </Container>
      </Flexer>
    </Flexer>
  );
};

export default Members;
