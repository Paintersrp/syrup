/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { useState, useRef, useEffect, FC, ReactNode } from 'react';
import { css } from '@emotion/react';

import { Text } from '../Text/Text';
import { ExtendedTheme } from '../../../theme/types';
import { Base, BaseProps } from '../../../theme/base';
import { inject } from '../../../theme/utils';
import { Icon } from '../Icon/Icon';

const styles = (theme: ExtendedTheme) => ({
  accordion: (isOpen: boolean) =>
    css({
      backgroundColor: theme.light,
      borderRadius: 6,
      marginBottom: isOpen ? 24 : 8,
      boxShadow: theme.shadows[1],
      transition: 'margin-bottom 0.3s ease',
      width: '100%',
    }),
  header: (isOpen: boolean) =>
    css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      backgroundColor: isOpen ? '#ebebeb' : '#dcdcdc',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, border-radius 1s ease',
      borderRadius: 6,
      borderBottomRightRadius: isOpen ? 0 : 6,
      borderBottomLeftRadius: isOpen ? 0 : 6,
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
      opacity: isOpen ? 1 : 0,
      transition:
        'max-height 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.4s cubic-bezier(0.645, 0.045, 0.355, 1)',
      maxHeight: `${contentHeight}px`,
      borderBottomLeftRadius: isOpen ? 6 : 0,
      borderBottomRightRadius: isOpen ? 6 : 0,
    }),
  contentInner: css({
    padding: 16,
  }),
});

interface Props extends BaseProps {
  title: string;
  content: ReactNode;
}

export const Accordion: FC<Props> = ({ title, content, ...rest }) => {
  const css = inject(styles);
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
    <Base css={css.accordion(isOpen)} {...rest}>
      <div css={css.header(isOpen)} onClick={toggleAccordion}>
        <Text t="h4">{title}</Text>
        <Icon icon="expand_more" css={css.icon(isOpen)} />
      </div>
      <div css={css.content(contentHeight, isOpen)}>
        <div css={css.contentInner} ref={contentRef}>
          {content}
        </div>
      </div>
    </Base>
  );
};
