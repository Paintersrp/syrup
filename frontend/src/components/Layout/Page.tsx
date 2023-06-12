import React, { CSSProperties, ReactNode, Suspense } from 'react';

import { seoData as data } from '../../settings';

import { Base, Loading, Text } from '../Elements';

import Error from './Error';
import SEO, { SEOData } from './SEO';

// import  text types instead
type HeaderType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeaderAlign = 'l' | 'r' | 'c' | 'left' | 'right' | 'center';

interface PageProps {
  children: ReactNode;
  header?: string;
  backgroundColor?: CSSProperties['backgroundColor'];
  headerType?: HeaderType;
  headerAlign?: HeaderAlign;
  className?: string;
  style?: CSSProperties;
  seoData?: SEOData;
  error?: any;
  ready?: boolean;
}

const Page: React.FC<PageProps> = ({
  children,
  header,
  headerAlign = 'center',
  headerType = 'h1',
  backgroundColor = '#F5F5F5',
  className,
  style,
  seoData = data.default,
  error = false,
  ready = true,
}) => {
  if (error) {
    return (
      <Error
        message={error.message}
        description={error.description}
        instructions={error.instructions}
        thanks={error.thanks}
      />
    );
  }

  if (!ready) {
    return <Loading load={true} />;
  }

  return (
    <Base a="c" fd="column" mt={30} w="100%" minh="80vh" bg={backgroundColor}>
      {header ? (
        <Text t={headerType} a={headerAlign}>
          {header}
        </Text>
      ) : null}
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
          <SEO data={seoData} />
          {children}
        </Suspense>
      </main>
    </Base>
  );
};

export default Page;
