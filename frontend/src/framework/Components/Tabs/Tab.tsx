import React, { ReactEventHandler } from "react";
import classNames from "classnames";
import "./Tabs.css";

export interface TabProps {
  onClick: ReactEventHandler;
  text: string;
  active?: boolean;
}

const Tab: React.FC<TabProps> = ({ onClick, text, active }) => {
  const tabClasses = classNames("tab-button", { active: active });

  return (
    <button className={tabClasses} onClick={onClick}>
      {text}
    </button>
  );
};

export default Tab;
