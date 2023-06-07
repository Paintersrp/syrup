import React, { CSSProperties, ReactNode } from "react";
import "../Containers.css";

import { SEO, SEOData, Text } from "../../Components";
import { seoData as data } from "../../../settings";
import { Error } from "../../Prebuilt";

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
  error?: any;
}

const Page: React.FC<PageProps> = ({
  children,
  header,
  headerAlign = "center",
  headerType = "h1",
  backgroundColor = "#F5F5F5",
  className,
  style,
  seoData = data.default,
  error = false,
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

  return (
    <React.Fragment>
      <SEO data={seoData} />
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
