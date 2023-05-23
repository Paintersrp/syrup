import React, { ReactNode } from "react";
import { palettes } from "../../../../theme";

import Flexer from "../../../Containers/Flexer/Flexer";
import Divider from "../../Divider/Divider";
import Text from "../../Text/Text";

interface DrawerFooterProps {
  title?: string;
}

const DrawerFooter: React.FC<DrawerFooterProps> = ({ title }) => {
  return (
    <Flexer fd="column" mb={12}>
      <div style={{ width: "100%" }}>
        <Divider mb={2} color={palettes.primary.hover} />
      </div>
      <Text t="subtitle1" a="center">
        © 2023 {title}
        <br />
        All rights reserved.
      </Text>
    </Flexer>
  );
};

export default DrawerFooter;
