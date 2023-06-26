import React from 'react';
import { css } from '@emotion/react';

import { Page } from '@/components/Layout';
import { Flexer, Surface } from '@/components/Containers';
import { Text } from '@/components/Elements';
import { Button } from '@/components/Buttons';
import { ExtendedTheme } from '@/theme/types';
import { inject } from '@/theme/utils';
import { ErrorResponse } from '@/types';

const styles = (theme: ExtendedTheme) => ({
  icon: css({
    ...theme.flex.cc,
    backgroundColor: theme.error,
    color: theme.light,
    borderRadius: '50%',
    height: 64,
    width: 64,
    marginBottom: 16,
    fontSize: 36,
  }),
});

export const Error: React.FC<ErrorResponse> = ({ message, description, instructions, thanks }) => {
  const css = inject(styles);

  return (
    <Page>
      <Surface fillHeight j="c" a="c">
        <Flexer j="c" fd="column" a="c">
          <div css={css.icon}>!</div>
          <Text t="h4" fw="700" c="error" a="c">
            {message || 'Oops, something went wrong!'}
          </Text>
          {description && (
            <Text t="body1" c="secondary" mb={12} a="c">
              {description}
            </Text>
          )}
          <Text t="body1" fw="400" c="secondary" a="c" w={400}>
            {instructions ||
              "We couldn't retrieve the data you were looking for. Please try again later."}
          </Text>
          <Button
            onClick={() => window.location.assign(window.location.origin)}
            startIcon="arrow_back"
            mt={16}
            size="sm"
            style={{ borderRadius: 4 }}
            w={100}
          >
            Go Back
          </Button>
          <Text t="body1" fw="400" mt={8} a="c" c="secondary">
            {thanks}
          </Text>
        </Flexer>
      </Surface>
    </Page>
  );
};
