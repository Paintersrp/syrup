/** @jsx jsx */
import { jsx } from '@emotion/react';

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

type SEOData = {
  title: string;
  description: string;
  keywords: string;
  url: string;
  image: string;
};

type SEODataMap = {
  [key: string]: SEOData;
};

export const seoData: SEODataMap = {
  '/': {
    title: 'Edgelords - Custom Web Design, App Design, and Web Hosting',
    description:
      'Edgelords offers custom web design, application design, and web hosting services. Contact us today to learn more!',
    keywords: 'Edgelords Design, custom web design, application design, web hosting, contact us',
    url: 'https://edgelords.com/',
    image: '/images/seo/landing.webp',
  },
  '/about': {
    title: 'About Our Business | Edgelords',
    description:
      'Learn about our company and our team of experts. We offer web design, application design, and web hosting services to help you grow your online presence.',
    keywords:
      'web design, application design, web hosting, about us, company history, team members, expertise, company',
    url: 'https://edgelords.com/about',
    image: '/images/seo/about.jpeg',
  },
  '/contact': {
    title: 'Contact Us - Edgelords',
    description: 'Contact us for any web design, application design, or web hosting inquiries.',
    keywords: 'contact, web design, application design, web hosting',
    url: 'https://edgelords.com/contact',
    image: '/images/seo/contact.webp',
  },
  '/services': {
    title: 'Our Services | Edgelords',
    description:
      'We offer a variety of services, including web design, application design, web hosting, and more. Learn more about our services and how we can help you.',
    keywords: 'web design, application design, web hosting, services',
    url: 'https://edgelords.com/services',
    image: '/images/seo/services.webp',
  },
  '/posts': {
    title: 'Company News | Edgelords',
    description: 'Stay up to date on the latest news and events from Edgelords.',
    keywords: 'company news, Edgelords, events, articles, up-to-date',
    url: 'https://edgelords.com/news',
    image: '/images/seo/news.webp',
  },
  default: {
    title: 'Edgelords | Your go-to source for web design, application design, and web hosting',
    description:
      'We specialize in web design, application design, and web hosting. Contact us to learn more!',
    keywords: 'web design, application design, web hosting',
    url: 'https://edgelords.com/',
    image: '/images/seo/default.webp',
  },
};

export const SEO: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const data = seoData[path] || seoData.default;

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
