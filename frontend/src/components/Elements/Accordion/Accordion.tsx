import { useState, useRef, useEffect, FC, ReactNode } from 'react';

import { Base, BaseProps } from '@/theme/base';
import { css } from '@emotion/react';
import Text from '../Text/Text';
import { Icon } from '@/components/Media';

const cx = {
  accordion: (isOpen: boolean) =>
    css({
      backgroundColor: '#f5f5f5',
      borderRadius: '6px',
      marginBottom: isOpen ? '24px' : '8px',
      boxShadow: 'var(--shadow-1)',
      transition: 'margin-bottom 0.3s ease',
      width: '100%',
    }),
  header: (isOpen: boolean) =>
    css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px',
      backgroundColor: isOpen ? '#ebebeb' : '#dcdcdc',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, border-radius 1s ease',
      borderRadius: '6px',
      borderBottomRightRadius: isOpen ? '0px' : '6px',
      borderBottomLeftRadius: isOpen ? '0px' : '6px',
      '&:hover': {
        backgroundColor: '#dcdcdc',
      },
    }),
  icon: (isOpen: boolean) =>
    css({
      transition: 'transform 0.3s ease',
      transform: isOpen ? 'rotate(-180deg)' : undefined,
    }),
  content: (contentHeight: number, isOpen: boolean) =>
    css({
      overflow: isOpen ? 'visible' : 'hidden',
      opacity: isOpen ? '1' : '0',
      transition:
        'max-height 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.4s cubic-bezier(0.645, 0.045, 0.355, 1)',
      maxHeight: `${contentHeight}px`,
      borderBottomLeftRadius: isOpen ? '6px' : '0px',
      borderBottomRightRadius: isOpen ? '6px' : '0px',
    }),
  contentInner: css({
    padding: '16px',
  }),
};

interface Props extends BaseProps {
  title: string;
  content: ReactNode;
}

const Accordion: FC<Props> = ({ title, content, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setContentHeight(isOpen ? contentRef.current?.scrollHeight || 0 : 0);
  }, [isOpen]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Base css={cx.accordion(isOpen)} {...rest}>
      <div css={cx.header(isOpen)} onClick={toggleAccordion}>
        <Text t="h4">{title}</Text>
        <Icon icon="expand_more" css={cx.icon(isOpen)} />
      </div>
      <div css={cx.content(contentHeight, isOpen)}>
        <div css={cx.contentInner} ref={contentRef}>
          {content}
        </div>
      </div>
    </Base>
  );
};

export default Accordion;
