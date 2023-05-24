import React, { useState, ReactElement, ReactEventHandler } from "react";
import { TabProps } from "./Tab";
import "./Tabs.css";

interface TabsProps {
  children: ReactElement<TabProps> | ReactElement<TabProps>[];
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="tab-group">
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
    </div>
  );
};

export default Tabs;
