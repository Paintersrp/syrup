import React, { useState } from 'react';
import './css/IconScroller.css';

import { Base, BaseProps } from '@/theme/base';
import { SOCIALS } from '@/settings';
import { SocialContent } from '@/types';
import { BrandButton } from '@/components/Buttons';
import { Link } from '@/components/Elements';

export const IconScroller: React.FC<BaseProps> = ({ ...rest }) => {
  const duplicatedPartners: SocialContent[] = [...SOCIALS, ...SOCIALS, ...SOCIALS];
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
          {duplicatedPartners.map((social: SocialContent, index: number) => (
            <div key={`${social.name}-${index}`} className="icon-scroller-icon">
              <Link to={`https://www.${social.name}.com/${social.handle}`}>
                <BrandButton
                  icon={social.icon}
                  fontSize="2.25rem"
                  palette="primary"
                  variant="float"
                  size="lg"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
};
