import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./IconScroller.css";

import { SOCIALS, SocialType } from "../../../../settings";
import { Base, BaseProps, Icon } from "../../../../framework";

const IconScroller: React.FC<BaseProps> = ({ ...rest }) => {
  const duplicatedPartners: SocialType[] = [...SOCIALS, ...SOCIALS, ...SOCIALS];
  const [isScrolling, setIsScrolling] = useState<boolean>(true);

  return (
    <Base className="icon-scroller-root" {...rest}>
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
    </Base>
  );
};

export default IconScroller;
