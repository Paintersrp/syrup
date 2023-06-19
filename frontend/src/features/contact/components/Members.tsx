import { FC } from 'react';

import { ButtonBar } from '@/components/Built';
import { Container, Flexer } from '@/components/Containers';
import { Text } from '@/components/Elements';
import { BaseProps } from '@/theme/base';
import { Member } from './Member';
import { MemberContent } from '../types';

import { useEditModeStore } from '@/stores/editmode';

interface MembersProps extends BaseProps {
  membersData: MemberContent[];
}

export const Members: FC<MembersProps> = ({ membersData, ...rest }) => {
  const { editMode } = useEditModeStore();

  return (
    <Flexer j="c" mt={40} {...rest}>
      <Flexer j="c" a="c" fd="column" mb={24} style={{ maxWidth: 900 }}>
        <Text t="h2" mb={36} s="1.8rem" style={{ borderBottom: '1px solid black' }}>
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
