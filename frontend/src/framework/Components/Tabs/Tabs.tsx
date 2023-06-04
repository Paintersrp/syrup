import React, { useState, ReactElement } from "react";
import "./Tabs.css";

import { Base, BaseProps } from "../../Containers";
import { TabProps } from "./Tab";

interface TabsProps extends BaseProps {
  children: ReactElement<TabProps> | ReactElement<TabProps>[];
}

const Tabs: React.FC<TabsProps> = ({ children, ...rest }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <Base className="tab-group" {...rest}>
      <div className="tab-buttons">
        {React.Children.map(
          children,
          (child: ReactElement<TabProps>, index: number) =>
            React.isValidElement(child) &&
            React.cloneElement<TabProps>(child, {
              key: index,
              onClick: (e) => {
                child.props.onClick?.(e); // Invoke the original onClick handler
                handleTabClick(index);
              },
              active: index === activeTab,
            })
        )}
      </div>
    </Base>
  );
};

export default Tabs;
