import React, { CSSProperties, ReactNode } from "react";
import "../Containers.css";

import { SEO, SEOData, Text } from "../../Base";

type HeaderType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeaderAlign = "l" | "r" | "c" | "left" | "right" | "center";

interface PageProps {
  children: ReactNode;
  header?: string;
  backgroundColor?: CSSProperties["backgroundColor"];
  headerType?: HeaderType;
  headerAlign?: HeaderAlign;
  className?: string;
  style?: CSSProperties;
  seoData?: SEOData;
}

const Page: React.FC<PageProps> = ({
  children,
  header,
  headerAlign = "center",
  headerType = "h1",
  backgroundColor = "#F5F5F5",
  className,
  style,
  seoData,
}) => {
  return (
    <React.Fragment>
      {/* Add Default SEO */}
      {seoData && <SEO data={seoData} />}
      <div className="page-root" style={{ backgroundColor }}>
        {header ? (
          <Text t={headerType} a={headerAlign}>
            {header}
          </Text>
        ) : null}
        <div className={`page-content ${className}`} style={style}>
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Page;
