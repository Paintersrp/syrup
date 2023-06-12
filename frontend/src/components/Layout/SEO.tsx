import React from "react";
import { Helmet } from "react-helmet-async";

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  image: string;
  url: string;
}

interface SEOProps {
  data: SEOData;
}

const SEO: React.FC<SEOProps> = ({ data }) => {
  return (
    <Helmet>
      <title>{data.title}</title>
      <meta name="description" content={data.description} />
      <meta name="keywords" content={data.keywords} />
      <meta property="og:title" content={data.title} />
      <meta property="og:description" content={data.description} />
      <meta property="og:image" content={data.image} />
      <meta property="og:url" content={data.url} />
      <meta property="og:type" content="website" />
      <meta property="og:image:alt" content={data.description} />
      <meta name="twitter:title" content={data.title} />
      <meta name="twitter:description" content={data.description} />
      <meta name="twitter:image" content={data.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="canonical" href={data.url} />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
};

export default SEO;
