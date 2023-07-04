import { FC } from 'react';
import { css } from '@emotion/react';

import { Flexer, Surface } from '@/components/Containers';
import { Link, Text } from '@/components/Elements';
import { Page } from '@/components/Layout';
import { ExtendedTheme } from '@/theme/types';
import { inject } from '@/theme/utils';

const styles = (theme: ExtendedTheme) => ({
  illustration: css({
    width: 325,
    marginBottom: 16,
  }),
  text: css({
    color: theme.secondary,
  }),
  link: css({
    padding: theme.sp(1.5),
    border: `2px solid ${theme.primary}`,
    bordeRadius: 4,
    color: theme.primary,
    transition: 'background-color 0.3s ease',
    width: 70,

    '&:hover': {
      backgroundColor: theme.primary,
      color: theme.light,
    },
  }),
});

export const NotFound: FC = () => {
  const css = inject(styles);

  return (
    <Page>
      <Surface fillHeight j="c" a="c">
        <img src="/images/not_found.svg" alt="Page Not Found Illustration" css={css.illustration} />
        <Text t="h2" a="c" mb={2}>
          Oops! Page Not Found
        </Text>
        <Text t="body1" s="1.2rem" css={css.text} a="c">
          We're sorry, but the page you are looking for could not be found.
        </Text>
        <Text t="body1" s="0.9rem" css={css.text} a="c" mt={2}>
          Please check the URL or go back to the homepage.
        </Text>
        <Flexer j="c" mt={20} gap={12}>
          <Link to="/" css={css.link}>
            Home
          </Link>
          <Link to="/about" css={css.link}>
            About
          </Link>
        </Flexer>
      </Surface>
    </Page>
  );
};
