import React from 'react';
import './css/Error.css';

import { Page } from '@/components/Layout';
import { Flexer, Surface } from '@/components/Containers';
import { Text } from '@/components/Elements';
import { Button } from '@/components/Buttons';
import { colors } from '@/theme/common';
import { ErrorResponse } from '@/types';

export const Error: React.FC<ErrorResponse> = ({ message, description, instructions, thanks }) => {
  return (
    <Page>
      <Surface fillHeight j="c" a="c">
        <Flexer j="c" fd="column" a="c">
          <div className="error-icon">!</div>
          <Text t="h4" fw="700" c={colors.error.main} a="c">
            {message || 'Oops, something went wrong!'}
          </Text>
          {description && (
            <Text t="body1" c={colors.text.secondary} mb={12} a="c">
              {description}
            </Text>
          )}
          <Text t="body1" fw="400" c={colors.text.secondary} a="c" w={400}>
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
          <Text t="body1" fw="400" mt={8} a="c" c={colors.text.secondary}>
            {thanks}
          </Text>
        </Flexer>
      </Surface>
    </Page>
  );
};
