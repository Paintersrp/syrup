import { useState, FC } from 'react';
import { css } from '@emotion/react';

import { ExtendedTheme } from '@/theme/types';
import { SiteLinkType } from '@/providers/LayoutProvider';
import { inject } from '@/theme/utils/inject';
import {
  BrandButton,
  Button,
  Container,
  Divider,
  Flexer,
  Icon,
  Input,
  Item,
  Link,
  PaletteOptions,
  Text,
  Tooltip,
} from 'sy-core';
import { LOGO, SOCIALS, TITLE } from '@/settings';
import { handleDataChange } from '@/utils/handle';

const styles = (theme: ExtendedTheme) => ({
  root: (color: string) =>
    css({
      color: theme.neutralLight,
      backgroundColor: theme[color],
      padding: theme.sp(4, 0, 1.5, 0),
      width: '100vw',
    }),
  container: css({
    width: '100%',
    maxWidth: 1280,
    margin: '0 auto',
    textAlign: 'center',
  }),
  link: css({
    color: theme.neutralLight,
    marginTop: 2,
    fontWeight: 300,
    display: 'flex',
  }),
  item: css({
    width: '33%',
    padding: theme.sp(2),
    marginBottom: 16,
  }),
});

type SubscribeDTO = {
  email: string;
};

type AppFooterProps = {
  color?: PaletteOptions;
  iconColor?: PaletteOptions;
  links: SiteLinkType[];
};

export const AppFooter: FC<AppFooterProps> = ({
  color = 'primary',
  iconColor = 'secondary',
  links,
}) => {
  const css = inject(styles);
  const [state, setState] = useState('initial');
  const [data, setData] = useState<SubscribeDTO>({ email: '' });

  return (
    <footer css={css.root(color)}>
      <div css={css.container}>
        <Flexer mb={0} j="c">
          <Tooltip text="View Home Page" position="right">
            <Link to="/" css={css.link}>
              {LOGO}
              <Text t="h4" ml={8}>
                {TITLE}
              </Text>
            </Link>
          </Tooltip>
        </Flexer>
        <Container mb={16}>
          <Item xs={12} lg={4} p="8px">
            <Flexer j="c" a="c" fd="column">
              <Text t="h6" a="l" style={{ width: '90%' }}>
                Email Address
              </Text>
              <Input
                id="emailaddress"
                type="text"
                value={data.email}
                onChange={(e) => handleDataChange(e, setData, data)}
                name="email"
                style={{
                  width: '90%',
                }}
              />
              <Flexer j="c">
                {/* Add Icons / State Checkmark */}
                <Button
                  disabled={state === 'success'}
                  variant="outlined"
                  palette={iconColor}
                  size="md"
                  mt={8}
                  w={105}
                  style={{ fontSize: '1rem' }}
                  onClick={() => setState(state === 'success' ? 'initial' : 'success')}
                >
                  {state === 'success' && (
                    <Icon icon="check" color="light" mr={4} ml={0} size="1.2rem" />
                  )}
                  {state === 'success' ? 'Subscribed' : 'Subscribe'}
                </Button>
              </Flexer>
            </Flexer>
          </Item>
          <Item xs={12} lg={4} p="8px">
            <Flexer fd="column" j="c" a="c">
              {links.map((link) => {
                if (!link.footer) {
                  return null;
                }
                return (
                  <Tooltip
                    key={`${link.key}-footer-link`}
                    text={`View ${link.key} Page`}
                    position="right"
                  >
                    <Link key={link.key} to={link.to} css={css.link}>
                      <Text t="body1">{link.key}</Text>
                    </Link>
                  </Tooltip>
                );
              })}
            </Flexer>
          </Item>
          <Item xs={12} lg={4} fd="column" p="8px">
            <Text t="h5" a="c" style={{ marginBottom: 2 }}>
              Connect with Us
            </Text>
            <Flexer j="c" a="c" wrap gap={6}>
              {SOCIALS.map((platform) => {
                if (platform.handle) {
                  return (
                    <span key={`${platform.name}-footer-social`}>
                      <Tooltip text={platform.handle} position="bottom">
                        <BrandButton
                          palette={iconColor}
                          variant="float"
                          size="sm"
                          fontSize="1.5rem"
                          aria-label={platform.name}
                          icon={platform.icon}
                          mt={4}
                        />
                      </Tooltip>
                    </span>
                  );
                } else {
                  return null;
                }
              })}
            </Flexer>
          </Item>
        </Container>
        <Divider color="#a6a6a6" />
        <Text t="subtitle2" a="c" style={{ marginTop: 6 }}>
          © 2023 {TITLE}. All rights reserved.
        </Text>
      </div>
    </footer>
  );
};
