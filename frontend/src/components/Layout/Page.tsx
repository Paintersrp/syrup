import React, { CSSProperties, ReactNode, Suspense } from 'react';

import { Loading, Text } from '../Elements';
import { SEO } from './SEO';
import { Base } from '@/theme/base';

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
};

export const Page: React.FC<PageProps> = ({
  children,
  header,
  headerAlign = 'center',
  headerType = 'h1',
  backgroundColor = '#F5F5F5',
  className,
  style,
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
          <SEO />
          {children}
        </Suspense>
      </main>
    </Base>
  );
};

export default Page;
