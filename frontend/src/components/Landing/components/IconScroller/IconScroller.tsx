import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./IconScroller.css";

import { SOCIALS, SocialType } from "../../../../config";
import { Icon } from "../../../../framework/Base";

const IconScroller: React.FC = () => {
  const duplicatedPartners: SocialType[] = [...SOCIALS, ...SOCIALS, ...SOCIALS];
  const [isScrolling, setIsScrolling] = useState<boolean>(true);

  return (
    <div className="icon-scroller-root">
      <div
        className="icon-scroller-container"
        onMouseEnter={() => setIsScrolling(false)}
        onMouseLeave={() => setIsScrolling(true)}
      >
        <div
          className="icon-scroller-wrapper"
          style={{ animationPlayState: isScrolling ? "running" : "paused" }}
        >
          {duplicatedPartners.map((social: SocialType) => (
            <div key={social.name} className="icon-scroller-icon">
              <Link to={`https://www.${social.name}.com/${social.handle}`}>
                <Icon icon={social.icon} size="2.5rem" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IconScroller;
