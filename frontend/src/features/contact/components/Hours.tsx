import { FC, useEffect, useState } from 'react';

import { Stagger } from '@/components/Animation';
import { IconTextItem } from '@/components/Media';
import { Editable } from '@/features/editable';
import { BaseProps } from '@/theme/base';

import { HoursContent } from '../types';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface HoursProps extends BaseProps {
  hoursData: HoursContent;
}

export const Hours: FC<HoursProps> = ({ hoursData, ...rest }) => {
  const [data, setData] = useState<any>(hoursData);

  useEffect(() => {
    setData(hoursData);
  }, [hoursData]);

  const updateData = (updatedData: HoursContent) => {
    setData(updatedData);
  };

  const editConfig = {
    name: 'hours',
    data: data,
    endpoint: `hours/1/`,
    editMenuPosition: 'bottom',
    onUpdate: updateData,
    formSettings: {
      width: 325,
    },
    ...rest,
  };

  return (
    <Editable {...editConfig}>
      <div style={{ width: 300, padding: '16px 24px' }}>
        <Stagger direction="right" orientation="vertical">
          {daysOfWeek.map((dayOfWeek, index) => (
            <IconTextItem
              key={`${dayOfWeek}-${index}`}
              textAlign="center"
              icon="today"
              text={dayOfWeek}
              subtext={data[dayOfWeek.toLowerCase()]}
              iconColor={data[dayOfWeek.toLowerCase()] === 'Closed' ? 'error' : ''}
              subtextColor={data[dayOfWeek.toLowerCase()] === 'Closed' ? 'error' : ''}
              divider={dayOfWeek !== 'Sunday'}
            />
          ))}
        </Stagger>
      </div>
    </Editable>
  );
};
