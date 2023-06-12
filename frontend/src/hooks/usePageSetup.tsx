import { useState } from 'react';

export const usePageSetup = () => {
  const [error, setError] = useState<any>(null);
  const [ready, setReady] = useState(false);

  return { error, setError, ready, setReady };
};
