import { useState, ReactElement, FC, isValidElement, cloneElement, Children } from 'react';

import { Base, BaseProps } from '@/theme/base';

import { TabProps } from './Tab';

interface TabsProps extends BaseProps {
  children: ReactElement<TabProps> | ReactElement<TabProps>[];
}

export const Tabs: FC<TabsProps> = ({ children, ...rest }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <Base d="flex" {...rest}>
      <Base d="flex">
        {Children.map(
          children,
          (child: ReactElement<TabProps>, index: number) =>
            isValidElement(child) &&
            cloneElement<TabProps>(child, {
              key: index,
              onClick: (e) => {
                child.props.onClick?.(e);
                handleTabClick(index);
              },
              active: index === activeTab,
            })
        )}
      </Base>
    </Base>
  );
};
