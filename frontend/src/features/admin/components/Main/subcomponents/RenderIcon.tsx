import React from 'react';

import { Icon } from '@/components/Media';

interface RenderIconProps {
  appName: string;
}

export function RenderIcon({ appName }: RenderIconProps): React.ReactElement | null {
  switch (appName) {
    case 'authorization':
      return <Icon icon="terminal" size="1.5rem" color="secondary" mr={16} />;
    case 'posts':
      return <Icon icon="terminal" size="1.5rem" color="secondary" mr={16} />;
    case 'InfoIcon':
      return <Icon icon="terminal" size="1.5rem" color="secondary" mr={16} />;
    case 'about':
      return <Icon icon="terminal" size="1.5rem" color="secondary" mr={16} />;
    case 'support':
      return <Icon icon="terminal" size="1.5rem" color="secondary" mr={16} />;
    case 'jobs':
      return <Icon icon="terminal" size="1.5rem" color="secondary" mr={16} />;
    case 'tables':
      return <Icon icon="terminal" size="1.5rem" color="secondary" mr={16} />;
    case 'contact':
      return <Icon icon="terminal" size="1.5rem" color="secondary" mr={16} />;
    case 'faqs':
      return <Icon icon="terminal" size="1.5rem" color="secondary" mr={16} />;
    case 'tasks':
      return <Icon icon="terminal" size="1.5rem" color="secondary" mr={16} />;
    default:
      return <Icon icon="terminal" size="1.5rem" color="secondary" mr={16} />;
  }
}
