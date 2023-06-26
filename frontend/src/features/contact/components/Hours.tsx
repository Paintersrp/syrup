import { FC } from 'react';

import { Stagger } from '@/components/Animation';
import { IconTextItem } from '@/components/Media';
import { Editable, useEditable } from '@/features/editable';
import { BaseProps } from '@/theme/base';

import { HoursContent } from '../types';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface HoursProps extends BaseProps {
  hoursData: HoursContent;
}

export const Hours: FC<HoursProps> = ({ hoursData, ...rest }) => {
  const [editableData, editConfig]: any = useEditable({
    name: 'hours',
    data: hoursData,
    endpoint: `hours/1/`,
    editMenuPosition: 'bottom',
    formSettings: {
      width: 325,
    },
  });

  return (
    <Editable {...editConfig} {...rest}>
      <div style={{ width: 300, padding: '16px 24px' }}>
        <Stagger direction="right" orientation="vertical">
          {daysOfWeek.map((dayOfWeek, index) => (
            <IconTextItem
              key={`${dayOfWeek}-${index}`}
              textAlign="center"
              icon="today"
              text={dayOfWeek}
              subtext={editableData[dayOfWeek.toLowerCase()]}
              iconColor={editableData[dayOfWeek.toLowerCase()] === 'Closed' ? 'error' : ''}
              subtextColor={editableData[dayOfWeek.toLowerCase()] === 'Closed' ? 'error' : ''}
              divider={dayOfWeek !== 'Sunday'}
            />
          ))}
        </Stagger>
      </div>
    </Editable>
  );
};
