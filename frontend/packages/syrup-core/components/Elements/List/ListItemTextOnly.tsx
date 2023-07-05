/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { FC } from 'react';
import { Flexer } from '../../Containers';
import { Link } from '../Link/Link';

import { Text } from '../Text/Text';

interface ListItemTextOnlyProps {
  text?: string;
  subtext?: string;
  textAlign?: 'left' | 'right' | 'center';
  to?: string;
  noGutters?: boolean;
}

const ListItemTextOnly: FC<ListItemTextOnlyProps> = ({
  text,
  subtext,
  textAlign = 'left',
  to,
  noGutters,
}) => {
  return (
    <React.Fragment>
      {to ? (
        <Link to={to}>
          <Flexer
            fd="column"
            style={{
              marginRight: noGutters ? 0 : textAlign === 'right' ? 16 : 0,
              marginLeft: noGutters ? 0 : textAlign !== 'right' ? 16 : 0,
            }}
          >
            <Text t="h5" a={textAlign}>
              {text}
            </Text>
            {subtext && (
              <Text mt={0} a={textAlign}>
                {subtext}
              </Text>
            )}
          </Flexer>
        </Link>
      ) : (
        <Flexer
          fd="column"
          style={{
            marginRight: noGutters ? 0 : textAlign === 'right' ? 16 : 0,
            marginLeft: noGutters ? 0 : textAlign !== 'right' ? 16 : 0,
          }}
        >
          <Text t="h5" a={textAlign}>
            {text}
          </Text>
          {subtext && (
            <Text mt={0} a={textAlign}>
              {subtext}
            </Text>
          )}
        </Flexer>
      )}
    </React.Fragment>
  );
};

export default ListItemTextOnly;
