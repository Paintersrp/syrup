/** @type { import('@storybook/react').Preview } */
import '@fontsource/roboto'; // Import Roboto font
import '@mdi/font/css/materialdesignicons.min.css';

import { ThemeProvider } from '@emotion/react';
import { light } from '../src/theme';
import { Base } from '../src/theme/base';
import { createPortal } from 'react-dom';

const popoverContainer = document.createElement('div');
popoverContainer.setAttribute('id', 'popover-root');
document.body.appendChild(popoverContainer);

export const decorators = [
  (Story) => (
    <>
      {createPortal(<div id="popover-root" />, popoverContainer)}
      <ThemeProvider theme={light}>
        <Base d="flex" a="c" j="c" h="99vh">
          <Story />
        </Base>
      </ThemeProvider>
    </>
  ),
];

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
