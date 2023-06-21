import React from 'react';

import { IconButton } from '@/components/Buttons';
import { Surface } from '@/components/Containers';
import { Divider, Link, List, ListItem, Menu, Text } from '@/components/Elements';

interface InfoMenuProps {
  textItem: {
    purpose: string;
    fields: { [key: string]: string };
    model_links?: { [key: string]: string };
  };
}

const InfoMenu: React.FC<InfoMenuProps> = ({ textItem }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Menu
        manualButton={<IconButton palette="info" size="sm" icon="info" className="info-button" />}
        position="bottom-left"
        style={{ width: 300, borderRadius: 8 }}
      >
        <Surface maxWidth={300} px={2} py={2}>
          <Text t="h3" a="c" mb={4}>
            Purpose
          </Text>
          <Text t="body1" w="auto">
            {textItem.purpose}
          </Text>
          <Divider mt={16} mb={16} />
          <List px={0} spacing={0} boxShadow={0} dividers={false} mb={0}>
            <Text t="h3" mb={4} a="c">
              Fields
            </Text>
            {Object.entries(textItem.fields).map(([key, value]) => (
              <ListItem key={key} text={key} subtext={value} noGutters />
            ))}
          </List>
          <Divider mt={16} mb={16} />
          {textItem.model_links && (
            <React.Fragment>
              <Text t="h3" mb={4} a="c">
                Model Links
              </Text>

              <List px={0} spacing={0} boxShadow={0} dividers={false}>
                {Object.entries(textItem.model_links).map(([key, value]) => (
                  <div key={key}>
                    <Link to={value} target="_blank" rel="noopener" className="link-text">
                      <Text t="body1" a="c" mt={2}>
                        {key}
                      </Text>
                    </Link>
                  </div>
                ))}
              </List>
            </React.Fragment>
          )}
        </Surface>
      </Menu>
    </div>
  );
};

export default InfoMenu;
