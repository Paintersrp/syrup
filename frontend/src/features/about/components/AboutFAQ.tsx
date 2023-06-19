import { useState, FC, Fragment } from 'react';

import { ButtonBar } from '@/components/Built';
import { Tab, Tabs } from '@/components/Buttons';
import { Flexer } from '@/components/Containers';
import { Accordion, Text } from '@/components/Elements';
import { useEditModeStore } from '@/stores/editmode';
import { BaseProps } from '@/theme/base';

interface AboutFAQProps extends BaseProps {}

export const AboutFAQ: FC<AboutFAQProps> = ({ ...rest }) => {
  const { editMode } = useEditModeStore();
  const [tabState, setTabState] = useState(0);

  return (
    <Flexer j="fs" a="fs" fd="column" mt={64} mb={64} {...rest}>
      <Flexer j="sb" className="values-container">
        <Text t="h3">Frequently Asked Questions</Text>
        {editMode && (
          <ButtonBar
            editClick={() => console.log('Edit')}
            adminLink="About"
            tooltipPosition="top"
          />
        )}
      </Flexer>
      <Tabs>
        <Tab onClick={() => setTabState(0)} text="Tab 1" />
        <Tab onClick={() => setTabState(1)} text="Tab 2" />
        <Tab onClick={() => setTabState(2)} text="Tab 3" />
      </Tabs>
      {tabState === 0 && (
        <Fragment>
          <Accordion title="Section 1" content="Content for Section 1" />
          <Accordion title="Section 2" content="Content for Section 2" />
        </Fragment>
      )}
      {tabState === 1 && (
        <Fragment>
          <Accordion title="Section 3" content="Content for Section 3" />
          <Accordion title="Section 4" content="Content for Section 4" />
        </Fragment>
      )}
      {tabState === 2 && <Accordion title="Section 5" content="Content for Section 5" />}
    </Flexer>
  );
};
