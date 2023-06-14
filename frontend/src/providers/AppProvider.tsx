import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Button } from '@/components/Buttons';
import { Loading, Text } from '@/components/Elements';

const ErrorFallback = () => {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <Text t="h2" fw="500">
        Ooops, something went wrong :(
      </Text>
      <Button onClick={() => window.location.assign(window.location.origin)}>Refresh</Button>
    </div>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <React.Suspense fallback={<Loading load={true} />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
    </React.Suspense>
  );
};
