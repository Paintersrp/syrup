import React, { useState } from "react";

import { Accordion, Tab, Tabs, Text } from "../../../../Base";
import { Flexer } from "../../../../Containers";

interface AboutFAQProps {
  // Add your prop types here
}

const AboutFAQ: React.FC<AboutFAQProps> = ({}) => {
  const [tabState, setTabState] = useState(0);

  return (
    <Flexer j="fs" a="fs" fd="column" mt={64} mb={64}>
      <Flexer j="sb" className="values-container">
        <Text t="h3">Frequently Asked Questions</Text>
        Edit/Admin
        {/* {editMode && <AdminButton tooltipText="Values" link="value" />} */}
      </Flexer>
      <Tabs>
        <Tab onClick={() => setTabState(0)} text="Tab 1" />
        <Tab onClick={() => setTabState(1)} text="Tab 2" />
        <Tab onClick={() => setTabState(2)} text="Tab 3" />
      </Tabs>
      {tabState === 0 && (
        <React.Fragment>
          <Accordion title="Section 1" content="Content for Section 1" />
          <Accordion title="Section 2" content="Content for Section 2" />
        </React.Fragment>
      )}
      {tabState === 1 && (
        <React.Fragment>
          <Accordion title="Section 3" content="Content for Section 3" />
          <Accordion title="Section 4" content="Content for Section 4" />
        </React.Fragment>
      )}
      {tabState === 2 && (
        <Accordion title="Section 5" content="Content for Section 5" />
      )}
    </Flexer>
  );
};

export default AboutFAQ;
