import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

import { palettes } from '@/utils';
import { Page } from '@/components/Layout';
import { Flexer, Surface } from '@/components/Containers';
import { Text } from '@/components/Elements';

const NotFound: React.FC = () => {
  return (
    <Page>
      <Surface fillHeight j="c" a="c">
        <img
          src="/images/not_found.svg"
          alt="Page Not Found Illustration"
          className="not-found-illustration"
        />
        <Text t="h2" a="c" mb={2}>
          Oops! Page Not Found
        </Text>
        <Text t="body1" s="1.2rem" c={palettes.text.secondary} a="c">
          We're sorry, but the page you are looking for could not be found.
        </Text>
        <Text t="body1" s="0.9rem" c={palettes.text.secondary} a="c" mt={2}>
          Please check the URL or go back to the homepage.
        </Text>
        <Flexer j="c" mt={20} gap={12}>
          <Link to="/" className="not-found-link">
            Home
          </Link>
          <Link to="/about" className="not-found-link">
            About
          </Link>
          <Link to="/contact" className="not-found-link">
            Contact
          </Link>
        </Flexer>
      </Surface>
    </Page>
  );
};

export default NotFound;
