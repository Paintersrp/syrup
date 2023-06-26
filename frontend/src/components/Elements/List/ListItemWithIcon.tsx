import React, { FC } from 'react';

import { Flexer } from '../../Containers';
import { Icon } from '../../Media';
import { Link } from '../Link/Link';
import { Text } from '../Text/Text';

interface ListItemWithIconProps {
  text?: string;
  subtext?: string;
  icon: string;
  iconColor?: string;
  textAlign?: 'left' | 'right' | 'center';
  to?: string;
  noGutters?: boolean;
}

const ListItemWithIcon: FC<ListItemWithIconProps> = ({
  text,
  subtext,
  icon,
  iconColor = 'secondary',
  textAlign = 'left',
  to,
  noGutters,
}) => {
  return (
    <React.Fragment>
      {to ? (
        <Link to={to} style={{ width: '100%', color: '#f5f5f5' }}>
          <Flexer j="sb">
            <Icon
              size="1.25rem"
              color={iconColor}
              icon={icon}
              style={{
                order: textAlign === 'right' || textAlign === 'center' ? 0 : 2,
              }}
              mr={noGutters ? 0 : textAlign !== 'right' ? 16 : 0}
              ml={noGutters ? 0 : textAlign === 'right' ? 16 : textAlign === 'center' ? 24 : 0}
            />
            <Flexer
              fd="column"
              style={{
                order: textAlign === 'right' ? 1 : 0,
                marginRight: noGutters
                  ? 0
                  : textAlign === 'right'
                  ? 16
                  : textAlign === 'center'
                  ? 62
                  : 0,
                marginLeft: noGutters ? 0 : textAlign === 'left' ? 16 : 0,
              }}
            >
              <Text t="h5" a={textAlign} c="inherit">
                {text}
              </Text>
              {subtext && (
                <Text mt={0} a={textAlign} c="inherit">
                  {subtext}
                </Text>
              )}
            </Flexer>
          </Flexer>
        </Link>
      ) : (
        <Flexer j="sb">
          <Icon
            size="1.25rem"
            color={iconColor}
            icon={icon}
            style={{
              order: textAlign === 'right' || textAlign === 'center' ? 0 : 2,
            }}
            mr={noGutters ? 0 : textAlign !== 'right' ? 16 : 0}
            ml={noGutters ? 0 : textAlign === 'right' ? 16 : textAlign === 'center' ? 24 : 0}
          />
          <Flexer
            fd="column"
            style={{
              order: textAlign === 'right' ? 1 : 0,
              marginRight: noGutters
                ? 0
                : textAlign === 'right'
                ? 16
                : textAlign === 'center'
                ? 62
                : 0,
              marginLeft: noGutters ? 0 : textAlign === 'left' ? 16 : 0,
            }}
          >
            <Text t="h5" a={textAlign} c="inherit">
              {text}
            </Text>
            {subtext && (
              <Text mt={0} a={textAlign} c="inherit">
                {subtext}
              </Text>
            )}
          </Flexer>
        </Flexer>
      )}
    </React.Fragment>
  );
};

export default ListItemWithIcon;
