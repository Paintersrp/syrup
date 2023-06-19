import { FC, ReactNode } from 'react';

import { ButtonBar } from '@/components/Built';
import { Surface } from '@/components/Containers';
import { BaseProps } from '@/components/Elements';
import { useEditModeStore } from '@/stores/editmode';

interface JobProps extends BaseProps {
  children: ReactNode;
}

export const Job: FC<JobProps> = ({ children, ...rest }) => {
  const { editMode }: any = useEditModeStore();
  return (
    <Surface maxWidth={1200} p={48} mt={32} mb={24} br={12} j="c" boxShadow={1} {...rest}>
      {editMode && <ButtonBar adminLink="jobposting" tooltipPosition="top" text="Job Openings" />}
      {children}
    </Surface>
  );
};
