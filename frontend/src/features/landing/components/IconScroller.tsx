import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/IconScroller.css';

import { SOCIALS, SocialType } from '@/settings';
import { Base, BaseProps } from '@/components/Elements';
import { Icon } from '@/components/Media';

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
          style={{ animationPlayState: isScrolling ? 'running' : 'paused' }}
        >
          {duplicatedPartners.map((social: SocialType, index: number) => (
            <div key={`${social.name}-${index}`} className="icon-scroller-icon">
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
