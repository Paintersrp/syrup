import { IconButton } from '@/components/Buttons';
import { Flexer } from '@/components/Containers';
import { Text } from '@/components/Elements';
import { MaterialIcon } from '@/components/Media';
import React from 'react';
import './css/PanelHeader.css';

interface PanelHeaderProps {
  header?: string | null;
  icon?: string;
  open: boolean;
  toggleOpen: () => void;
  children?: any;
}

const PanelHeader: React.FC<PanelHeaderProps> = ({
  header,
  icon = 'web_stories',
  open,
  toggleOpen,
  children,
}) => {
  return (
    <div className="panel-header">
      <Flexer a="c" mt={2}>
        {icon && <MaterialIcon icon={icon} className="panel-header-icon" size="22px" />}
        {header && <Text t="h4">{header}</Text>}
      </Flexer>
      <Flexer j="fe" a="c" grow gap={12} w="auto">
        {children}
        <IconButton
          size="t"
          fontSize="21px"
          color="secondary"
          material={open ? 'expand_more' : 'expand_less'}
          onClick={toggleOpen}
          iconColor="#fff"
        />
      </Flexer>
    </div>
  );
};

export default PanelHeader;
