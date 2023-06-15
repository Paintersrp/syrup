import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';

import { Button } from '@/components/Buttons';
import { Loading, Text } from '@/components/Elements';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '@/lib/api';
import Error from '@/components/Layout/Error';

const ErrorFallback = ({ error }: { error: any | null }) => {
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
        <ErrorBoundary
          fallbackRender={({ error }: any | undefined) => <ErrorFallback error={error} />}
        >
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </ErrorBoundary>
      </HelmetProvider>
    </React.Suspense>
  );
};
