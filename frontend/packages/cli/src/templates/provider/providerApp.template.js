/**
 * @description
 * Returns the template for generating an AppProvider file in the providers directory.
 *
 * @returns {string} - The AppProvider template.
 */
export const ProviderAppTemplate = () =>
  `
  import * as React from 'react';
  import { ErrorBoundary } from 'react-error-boundary';
  import { HelmetProvider } from 'react-helmet-async';
  import { ThemeProvider } from '@emotion/react';
  
  import { Loading } from '@/components/Elements';
  import { QueryClientProvider } from 'react-query';
  import { queryClient } from '@/lib/api';
  import { Error } from '@/components/Layout/Error';
  
  import { light } from '@/theme';
  
  const ErrorFallback = ({ error }: { error: any | null }) => {
    console.log(error);
    return (
      <Error
        message={error.error.message}
        description={error.error.description}
        instructions={error.error.instructions}
        thanks={error.error.thanks}
      />
    );
  };
  
  type AppProviderProps = {
    children: React.ReactNode;
  };
  
  export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    return (
      <React.Suspense fallback={<Loading load={true} />}>
        <HelmetProvider>
          <ErrorBoundary fallbackRender={({ error }) => <ErrorFallback error={error} />}>
            <QueryClientProvider client={queryClient}>
              <ThemeProvider theme={light}>{children}</ThemeProvider>
            </QueryClientProvider>
          </ErrorBoundary>
        </HelmetProvider>
      </React.Suspense>
    );
  };  
`;
