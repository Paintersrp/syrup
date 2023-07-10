/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { CSSProperties, ReactNode, Suspense } from 'react';
import { Base } from '../../theme/base';

import { Loading, Text } from '../Elements';
import { SEO } from './SEO';

// import  text types instead
type HeaderType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeaderAlign = 'l' | 'r' | 'c' | 'left' | 'right' | 'center';

type PageProps = {
  children: ReactNode;
  header?: string;
  backgroundColor?: CSSProperties['backgroundColor'];
  headerType?: HeaderType;
  headerAlign?: HeaderAlign;
  className?: string;
  style?: CSSProperties;
  seo?: boolean;
};

export const Page: React.FC<PageProps> = ({
  children,
  header,
  headerAlign = 'center',
  headerType = 'h1',
  backgroundColor = '#F5F5F5',
  className,
  style,
  seo = true,
}) => {
  return (
    <Base a="c" fd="column" mt={30} w="100%" minh="80vh" bg={backgroundColor}>
      <main
        className={className}
        style={{
          ...style,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          minHeight: '80vh',
        }}
      >
        <Suspense fallback={<Loading load={true} />}>
          {header ? (
            <Text t={headerType} a={headerAlign} mt={56}>
              {header}
            </Text>
          ) : null}
          {seo && <SEO />}
          {children}
        </Suspense>
      </main>
    </Base>
  );
};
